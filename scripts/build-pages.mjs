// Builds the GitHub Pages artifact into _site/.
// 1. Copies the static landing page from site/.
// 2. Publishes docs/ under _site/docs/: Markdown is rendered to HTML,
//    HTML pages and assets are copied as-is, and an index page links them all.
// The source files in docs/ stay the single source of truth; nothing is hand-copied.
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

const ROOT = process.cwd();
const SITE_SRC = path.join(ROOT, "site");
const DOCS_SRC = path.join(ROOT, "docs");
const OUT = path.join(ROOT, "_site");
const OUT_DOCS = path.join(OUT, "docs");

// Only these file types are published from docs/. Anything else fails the build,
// so a stray file (keys, exports, OS junk) cannot reach the public site unnoticed.
const PAGE_EXTENSIONS = new Set([".md", ".html"]);
// .svg is deliberately excluded: an SVG can embed <script>, and Pages serves it from the
// github.io origin, so opening it directly would run that script there.
const ASSET_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const MAX_CODE_POINT = 0x10ffff;

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const NAMED_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

// Turns source text such as `A &amp; B` into `A & B` so escapeHtml does not escape it twice.
function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, body) => {
    if (body[0] === "#") {
      const code = body[1].toLowerCase() === "x" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      // Out-of-range values would make String.fromCodePoint throw and fail the whole build.
      return Number.isFinite(code) && code <= MAX_CODE_POINT ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match;
  });
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith(".")) // skip .DS_Store, dotfiles and dot-folders
      .map((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
      }),
  );
  return nested.flat();
}

function assertPublishable(relPath) {
  const ext = path.extname(relPath).toLowerCase();
  if (!PAGE_EXTENSIONS.has(ext) && !ASSET_EXTENSIONS.has(ext)) {
    throw new Error(`Refusing to publish unsupported file from docs/: ${relPath}`);
  }
}

// Relative links written as `foo.md` must point at the rendered `foo.html`.
function rewriteMarkdownLinks(html) {
  return html.replace(
    /href="((?!https?:|mailto:|#|\/)[^"]+?)\.md(#[^"]*)?"/g,
    (_, target, hash = "") => `href="${target}.html${hash}"`,
  );
}

function pageShell({ title, body, backHref }) {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
:root{--bg:#fff;--fg:#1f2328;--muted:#59636e;--link:#0969da;--border:#d1d9e0;--code:#f6f8fa}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#0d1117;--fg:#e6edf3;--muted:#9198a1;--link:#4493f8;--border:#3d444d;--code:#161b22}}
:root[data-theme="dark"]{--bg:#0d1117;--fg:#e6edf3;--muted:#9198a1;--link:#4493f8;--border:#3d444d;--code:#161b22}
body{margin:0;background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans TC",sans-serif;line-height:1.7}
main{max-width:860px;margin:0 auto;padding:24px 16px 64px;overflow-wrap:anywhere}
a{color:var(--link)}
img{max-width:100%;height:auto}
pre{background:var(--code);padding:12px;overflow:auto;border-radius:6px}
code{font-size:.92em}
table{border-collapse:collapse;display:block;overflow:auto}
th,td{border:1px solid var(--border);padding:6px 10px}
nav{color:var(--muted);font-size:14px;margin-bottom:16px}
ul.tree{list-style:none;padding-left:18px;margin:4px 0}
ul.tree li{margin:4px 0}
details>summary{cursor:pointer;font-weight:600;margin:6px 0}
a.asset{color:var(--muted);font-size:14px}
</style>
</head>
<body>
<main>
<nav><a href="${backHref}">← 返回文件索引</a></nav>
${body}
</main>
</body>
</html>
`;
}

async function renderMarkdown(relPath, source) {
  const title = decodeEntities((source.match(/^#\s+(.+)$/m)?.[1] ?? relPath).trim());
  const depth = relPath.split(path.sep).length - 1;
  const backHref = `${"../".repeat(depth)}index.html`;
  const html = rewriteMarkdownLinks(marked.parse(source));
  return { title, html: pageShell({ title, body: html, backHref }) };
}

async function htmlTitle(source, fallback) {
  const raw = source.match(/<title>([^<]+)<\/title>/i)?.[1] ?? fallback;
  return decodeEntities(raw).trim();
}

// Builds a folder tree from entry hrefs (posix paths relative to docs/), so the
// index mirrors the real directory layout instead of a flat list.
function buildTree(entries) {
  const root = { name: "", dirs: new Map(), files: [] };
  for (const entry of entries) {
    const parts = entry.href.split("/");
    const fileName = parts.pop();
    let node = root;
    for (const dir of parts) {
      if (!node.dirs.has(dir)) node.dirs.set(dir, { name: dir, dirs: new Map(), files: [] });
      node = node.dirs.get(dir);
    }
    node.files.push({ ...entry, label: entry.asset ? fileName : entry.title });
  }
  return root;
}

function renderTree(node) {
  const folders = [...node.dirs.values()]
    .sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"))
    .map(
      (dir) => `<li><details open><summary>📁 ${escapeHtml(dir.name)}/</summary>${renderTree(dir)}</details></li>`,
    );
  const files = [...node.files]
    .sort((a, b) => a.label.localeCompare(b.label, "zh-Hant"))
    .map((f) => {
      const cls = f.asset ? ' class="asset"' : "";
      return `<li><a${cls} href="${escapeHtml(f.href)}">${escapeHtml(f.label)}</a></li>`;
    });
  return `<ul class="tree">${[...folders, ...files].join("\n")}</ul>`;
}

function indexPage(entries) {
  const body = `<h1>文件索引</h1>
<p>依照 repo 內 <code>docs/</code> 的資料夾結構排列；資料夾可點擊展開或收合。</p>
${renderTree(buildTree(entries))}`;
  return pageShell({ title: "文件索引", body, backHref: "../index.html" });
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await cp(SITE_SRC, OUT, { recursive: true });

  const entries = [];
  for (const absPath of await walk(DOCS_SRC)) {
    const relPath = path.relative(DOCS_SRC, absPath);
    assertPublishable(relPath); // check before creating any output directory
    const destPath = path.join(OUT_DOCS, relPath);
    await mkdir(path.dirname(destPath), { recursive: true });
    const posixRel = relPath.split(path.sep).join("/");
    const ext = path.extname(relPath).toLowerCase(); // same case rule as assertPublishable

    if (ext === ".md") {
      const { title, html } = await renderMarkdown(relPath, await readFile(absPath, "utf8"));
      const outRel = posixRel.replace(/\.md$/i, ".html");
      await writeFile(path.join(OUT_DOCS, outRel), html);
      entries.push({ href: outRel, title });
    } else if (ext === ".html") {
      const title = await htmlTitle(await readFile(absPath, "utf8"), posixRel);
      await cp(absPath, destPath);
      entries.push({ href: posixRel, title });
    } else {
      await cp(absPath, destPath); // images and other assets referenced by pages
      entries.push({ href: posixRel, title: path.basename(relPath), asset: true });
    }
  }

  entries.sort((a, b) => a.href.localeCompare(b.href, "zh-Hant"));
  await writeFile(path.join(OUT_DOCS, "index.html"), indexPage(entries));

  console.log(`Built _site/ with ${entries.length} docs pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
