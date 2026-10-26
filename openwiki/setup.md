---
type: "Reference"
title: "OpenWiki Setup and MCP Integration"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-10-26T17:47:18.458Z
sources:
  - id: openwiki-source-ea70eb6c045047448e446296
    resource: repo://.gitignore
  - id: openwiki-source-f5a489e5822d87c0b8fc66ef
    resource: repo://.mcp.json
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "claude-code", at: "2026-10-26T17:47:18.458Z" }
---

# OpenWiki Setup and MCP Integration

This page describes how OpenWiki is installed in this repository and how its MCP server is connected to Claude.

## Installation

OpenWiki is declared as an npm dependency in `package.json`:

```json
"dependencies": {
  "openwiki": "^0.7.2"
}
```

The install metadata at `.claude/skills/openwiki/.openwiki-install.json` records the installed package as `openwiki` version `0.7.2` with target `claude`. It also stores SHA-256 checksums for the installed skill files (`SKILL.md`, `agents/bob.yaml`, `agents/openai.yaml`).

`node_modules/` is listed in `.gitignore`, so it is not committed. To restore dependencies on a fresh clone, run:

```bash
npm install
```

## MCP Server Wiring

`.mcp.json` registers one MCP server named `openwiki`:

```json
{
  "mcpServers": {
    "openwiki": {
      "command": "openwiki",
      "args": ["mcp", "--host", "claude"]
    }
  }
}
```

Claude starts the server by running `openwiki mcp --host claude`. The `openwiki` command must be available on the `PATH` of the environment that launches Claude. Because the package is a local dependency, it is available through `node_modules/.bin` when the shell is set up for the project.

## Server Lifecycle Tools

The server exposes these tools for generating and maintaining a wiki:

| Tool | Purpose |
|---|---|
| `openwiki_begin` | Start or resume a run in `init` or `update` mode for a repository root |
| `openwiki_submit_plan` | Submit the page plan during the planning phase |
| `openwiki_next_page` | Return the next pending page job |
| `openwiki_submit_page` | Complete a page job with its claims |
| `openwiki_finish` | Finalize the run after every page job is complete |

It also exposes read-only tools for searching and reading existing wikis (`openwiki_search`, `openwiki_read`) and for listing workspaces (`openwiki_list_workspaces`, `openwiki_list_wikis`).

Claim evidence uses the `repo://<path>` form, for example `repo://package.json`.

## Related Pages

- [Overview](overview.md)
- [Quickstart](quickstart.md)
