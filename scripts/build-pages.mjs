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

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return nested.flat();
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
  const title = (source.match(/^#\s+(.+)$/m)?.[1] ?? relPath).trim();
  const depth = relPath.split(path.sep).length - 1;
  const backHref = `${"../".repeat(depth)}index.html`;
  const html = rewriteMarkdownLinks(marked.parse(source));
  return { title, html: pageShell({ title, body: html, backHref }) };
}

async function htmlTitle(source, fallback) {
  return (source.match(/<title>([^<]+)<\/title>/i)?.[1] ?? fallback).trim();
}

function indexPage(entries) {
  const items = entries
    .map((e) => `<li><a href="${e.href}">${escapeHtml(e.title)}</a></li>`)
    .join("\n");
  const body = `<h1>文件索引</h1>
<p>來源：repo 內的 <code>docs/</code> 資料夾。</p>
<ul>
${items}
</ul>`;
  return pageShell({ title: "文件索引", body, backHref: "../index.html" });
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await cp(SITE_SRC, OUT, { recursive: true });

  const entries = [];
  for (const absPath of await walk(DOCS_SRC)) {
    const relPath = path.relative(DOCS_SRC, absPath);
    const destPath = path.join(OUT_DOCS, relPath);
    await mkdir(path.dirname(destPath), { recursive: true });
    const posixRel = relPath.split(path.sep).join("/");

    if (relPath.endsWith(".md")) {
      const { title, html } = await renderMarkdown(relPath, await readFile(absPath, "utf8"));
      const outRel = posixRel.replace(/\.md$/, ".html");
      await writeFile(path.join(OUT_DOCS, outRel), html);
      entries.push({ href: outRel, title });
    } else if (relPath.endsWith(".html")) {
      const title = await htmlTitle(await readFile(absPath, "utf8"), posixRel);
      await cp(absPath, destPath);
      entries.push({ href: posixRel, title });
    } else {
      await cp(absPath, destPath); // images and other assets referenced by pages
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
