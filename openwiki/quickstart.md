---
type: "Reference"
title: "OpenWiki Quickstart"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-10-26T17:47:18.458Z
sources:
  - id: openwiki-source-f5a489e5822d87c0b8fc66ef
    resource: repo://.mcp.json
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "claude-code", at: "2026-10-26T17:47:18.458Z" }
---

# OpenWiki Quickstart

Use these steps to get this repository ready for OpenWiki. The repository currently has no commits and no application source code.

## 1. Install Dependencies

```bash
npm install
```

This installs the `openwiki` dependency declared in `package.json` into `node_modules/`, which is git-ignored.

## 2. Confirm the MCP Server Launches

Claude starts the OpenWiki server from `.mcp.json`:

```bash
openwiki mcp --host claude
```

If the command is not found, the `openwiki` binary is not on `PATH`. Re-run `npm install` and check that `node_modules/.bin/openwiki` exists.

## 3. Generate or Update the Wiki

Ask Claude to initialize or update the wiki for this repository. Claude calls the OpenWiki lifecycle tools in order:

1. `openwiki_begin` with the repository root and mode `init` (or `update`).
2. `openwiki_submit_plan` with the planned pages.
3. `openwiki_next_page` and `openwiki_submit_page` for each page.
4. `openwiki_finish` once every page is complete.

Generated pages are written under `openwiki/` in this repository.

## Notes

- There are no commits yet. Commit the work before relying on the wiki's history.
- Claim evidence must use the `repo://<path>` form, for example `repo://package.json`.

## Related Pages

- [Overview](overview.md)
- [Setup and MCP Integration](setup.md)
