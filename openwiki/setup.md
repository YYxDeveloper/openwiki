---
type: "Reference"
title: "OpenWiki 安裝與 MCP 整合"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-11-11T13:06:53.166Z
sources:
  - id: openwiki-source-6d4b4e707b8d60b6ccfa3425
    resource: repo://.github/workflows/openwiki-update.yml
  - id: openwiki-source-ea70eb6c045047448e446296
    resource: repo://.gitignore
  - id: openwiki-source-f5a489e5822d87c0b8fc66ef
    resource: repo://.mcp.json
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "claude-code", at: "2026-11-11T13:06:53.166Z" }
---

# OpenWiki 安裝與 MCP 整合

本頁說明 OpenWiki 在本倉庫如何安裝、如何接上 Claude 的 MCP 伺服器，以及既有的排程更新設定。

## 安裝

OpenWiki 在 `package.json` 宣告為 npm 相依套件：

```json
"dependencies": {
  "openwiki": "^0.7.2"
}
```

`.claude/skills/openwiki/.openwiki-install.json` 記錄已安裝的套件為 `openwiki` 版本 `0.7.2`，目標為 `claude`，並保存 skill 檔案（`SKILL.md`、`agents/bob.yaml`、`agents/openai.yaml`）的 SHA-256 檢查碼。

`node_modules/` 列在 `.gitignore`，不會被提交。在新複製的倉庫還原相依套件：

```bash
npm install
```

## MCP 伺服器接線

`.mcp.json` 註冊一個名為 `openwiki` 的 MCP 伺服器：

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

Claude 執行 `openwiki mcp --host claude` 來啟動伺服器。啟動 Claude 的環境，其 `PATH` 必須找得到 `openwiki` 指令。套件是本機相依，所以在專案的 shell 環境下可透過 `node_modules/.bin` 使用。

## 生命週期工具

| 工具 | 用途 |
|---|---|
| `openwiki_begin` | 針對倉庫根目錄，以 `init` 或 `update` 模式開始或接續一次執行 |
| `openwiki_submit_plan` | 在規劃階段提交頁面計畫 |
| `openwiki_next_page` | 回傳下一個待處理的頁面工作 |
| `openwiki_submit_page` | 提交頁面工作及其 Claims |
| `openwiki_finish` | 所有頁面完成後結束這次執行 |

伺服器另有唯讀工具，用來搜尋與讀取既有 wiki（`openwiki_search`、`openwiki_read`），以及列出工作區（`openwiki_list_workspaces`、`openwiki_list_wikis`）。

Claim 的證據使用 `repo://<path>` 格式，例如 `repo://package.json`。

## 語言設定

`openwiki_begin` 可傳入 `language`（BCP-47 代碼）。一旦有一次執行以某語言開始，必須先完成該次執行，才能改成其他語言。本 wiki 目前為繁體中文（`zh-TW`）。

## 排程更新 workflow

`.github/workflows/openwiki-update.yml` 是既有設定，名稱為 `OpenWiki Update`。它可手動觸發（`workflow_dispatch`），也會以 cron `0 8 * * *` 每日執行。流程為：

1. 完整複製倉庫並安裝 Node.js 22。
2. 全域安裝 `openwiki@0.7.2`，執行 `openwiki code --update --print`。
3. 刪除暫存的 `openwiki/.run.json`。
4. 以 `docs: update OpenWiki` 為標題，把 `openwiki`、`AGENTS.md` 與 workflow 檔的變更開成 pull request（分支 `openwiki/update`）。

這個 workflow 只負責更新 wiki，不是測試用途。

## 相關頁面

- [概覽](overview.md)
- [快速開始](quickstart.md)
- [參考文章收錄](articles.md)
