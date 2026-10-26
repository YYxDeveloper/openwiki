---
type: "Reference"
title: "OpenWiki Overview"
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

# OpenWiki Overview

This repository is a workspace that has been initialized for [OpenWiki](https://www.npmjs.com/package/openwiki) (npm package `openwiki`, version `0.7.2`). It does not yet contain application source code, and it has no git commits.

## Current State

| Item | Status |
|---|---|
| Application source code | None |
| Git commits | None (`main` branch has no commits yet) |
| Dependencies | `openwiki@^0.7.2` declared in `package.json`, installed in `node_modules/` |
| MCP integration | Configured for Claude in `.mcp.json` |

## Repository Layout

```
.
├── .claude/skills/openwiki/     # OpenWiki skill installed for Claude
│   ├── .openwiki-install.json   # Install metadata (package, version, file checksums)
│   ├── SKILL.md                 # Skill instructions
│   └── agents/                  # Agent definitions (bob.yaml, openai.yaml)
├── .gitignore                   # Ignores node_modules/
├── .mcp.json                    # Registers the openwiki MCP server for Claude
├── package.json                 # Declares the openwiki dependency
├── package-lock.json            # Locked dependency tree
└── node_modules/                # Installed packages (git-ignored)
```

## How the Pieces Fit Together

1. **`package.json`** declares the `openwiki` npm dependency.
2. **`.mcp.json`** tells Claude to start the MCP server with `openwiki mcp --host claude`.
3. **`.claude/skills/openwiki/`** holds the skill that tells Claude how to use the OpenWiki tools.
4. The MCP server exposes tools for generating and reading the wiki, which is written under `openwiki/` in this repository.

See [Quickstart](quickstart.md) for how to get running and [Setup and MCP Integration](setup.md) for configuration details.
