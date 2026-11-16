# Graph Report - openwiki  (2026-11-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 80 nodes · 78 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.82)
- Token cost: 71,863 input · 135 output

## Graph Freshness
- Built from commit: `4bca1ff6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Package Manifest
- Scheduled Update Workflow
- Article Collection Docs
- LLM Environment Variables
- PR Action Inputs
- OpenWiki Retrieval Policy
- Workflow Step Fields
- Bob Interface Config
- OpenAI Interface Config
- MCP Server Config

## God Nodes (most connected - your core abstractions)
1. `steps` - 9 edges
2. `env` - 8 edges
3. `with` - 8 edges
4. `interface` - 4 edges
5. `interface` - 4 edges
6. `參考文章收錄 (wiki page)` - 4 edges
7. `update` - 3 edges
8. `on` - 3 edges
9. `permissions` - 3 edges
10. `OpenWiki 快速開始` - 3 edges

## Surprising Connections (you probably didn't know these)
- `收錄新文章三步驟` --semantically_similar_to--> `參考文章收錄 (wiki page)`  [INFERRED] [semantically similar]
  README.md → openwiki/articles.md
- `openwiki_search / openwiki_read tools` --conceptually_related_to--> `OpenWiki page-job lifecycle`  [INFERRED]
  AGENTS.md → .claude/skills/openwiki/SKILL.md
- `OpenWiki 安裝與 MCP 整合` --references--> `參考文章收錄 (wiki page)`  [EXTRACTED]
  openwiki/setup.md → openwiki/articles.md
- `OpenWiki 概覽` --references--> `OpenWiki 快速開始`  [EXTRACTED]
  openwiki/overview.md → openwiki/quickstart.md
- `OpenWiki 快速開始` --references--> `OpenWiki 安裝與 MCP 整合`  [EXTRACTED]
  openwiki/quickstart.md → openwiki/setup.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **OpenWiki generated page set** — openwiki_overview, openwiki_quickstart, openwiki_setup, openwiki_articles [INFERRED 0.80]

## Communities (10 total, 1 thin omitted)

### Community 0 - "Package Manifest"
Cohesion: 0.15
Nodes (13): author, dependencies, openwiki@^0.7.2, description, keywords, license, main, name (+5 more)

### Community 1 - "Scheduled Update Workflow"
Cohesion: 0.17
Nodes (11): jobs, update, name, on, schedule, workflow_dispatch, permissions, contents (+3 more)

### Community 2 - "Article Collection Docs"
Cohesion: 0.25
Nodes (9): herdr 快捷鍵與切換 agent, 2026-11 多模態與語音轉文字模型清單, 參考文章收錄 (wiki page), OpenWiki 概覽, OpenWiki 快速開始, OpenWiki 安裝與 MCP 整合, README.md (openwiki project), 收錄新文章三步驟 (+1 more)

### Community 3 - "LLM Environment Variables"
Cohesion: 0.25
Nodes (8): LANGCHAIN_PROJECT, LANGCHAIN_TRACING_V2, LANGSMITH_API_KEY, OPENAI_API_KEY, OPENWIKI_LANGSMITH_API_KEY, OPENWIKI_MODEL_ID, OPENWIKI_PROVIDER, env

### Community 4 - "PR Action Inputs"
Cohesion: 0.25
Nodes (8): with, add-paths, body, branch, commit-message, fetch-depth, node-version, title

### Community 5 - "OpenWiki Retrieval Policy"
Cohesion: 0.29
Nodes (7): AGENTS.md (OpenWiki guidance block), OpenWiki just-in-time retrieval policy, openwiki_search / openwiki_read tools, Scheduled OpenWiki GitHub Actions workflow, openwiki SKILL.md, Claims contract, OpenWiki page-job lifecycle

### Community 6 - "Workflow Step Fields"
Cohesion: 0.29
Nodes (7): continue-on-error, id, if, name, run, uses, steps

### Community 7 - "Bob Interface Config"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 8 - "OpenAI Interface Config"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

## Knowledge Gaps
- **6 isolated node(s):** `openwiki`, `herdr 快捷鍵與切換 agent`, `2026-11 多模態與語音轉文字模型清單`, `yt-agent 影片分析`, `Scheduled OpenWiki GitHub Actions workflow` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 50 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `steps` connect `Workflow Step Fields` to `Scheduled Update Workflow`, `LLM Environment Variables`, `PR Action Inputs`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **What connects `openwiki`, `herdr 快捷鍵與切換 agent`, `2026-11 多模態與語音轉文字模型清單` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `update` connect `Scheduled Update Workflow` to `Workflow Step Fields`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._