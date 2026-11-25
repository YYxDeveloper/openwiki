---
type: "Reference"
title: "OpenWiki 快速開始"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-11-16T14:22:10.483Z
sources:
  - id: openwiki-source-f5a489e5822d87c0b8fc66ef
    resource: repo://.mcp.json
  - id: openwiki-source-4b769cec6f285a1b25729b93
    resource: repo://docs/articles/develop/opencode-shortcuts.md
  - id: openwiki-source-9186e7d6c90c3a4612a8f747
    resource: repo://docs/articles/README.md
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "opencode", at: "2026-11-16T14:22:10.483Z" }
---

# OpenWiki 快速開始

依下列步驟讓本倉庫可以使用 OpenWiki。

## 1. 安裝相依套件

```bash
npm install
```

這會把 `package.json` 宣告的 `openwiki` 安裝到 `node_modules/`（已列入 `.gitignore`）。

## 2. 確認 MCP 伺服器可以啟動

Claude 依 `.mcp.json` 啟動 OpenWiki 伺服器，指令是：

```bash
node ./node_modules/openwiki/dist/cli/cli.js mcp --host claude
```

設定使用相對路徑，所以要從倉庫根目錄啟動。若 `node_modules/openwiki/dist/cli/cli.js` 不存在，重新執行 `npm install`。

## 3. 產生或更新 wiki

請 Claude 初始化或更新本倉庫的 wiki。Claude 會依序呼叫 OpenWiki 的生命週期工具：

1. `openwiki_begin`，帶入倉庫根目錄與模式 `init`（或 `update`）。
2. `openwiki_submit_plan`，提交頁面計畫。
3. 對每一頁呼叫 `openwiki_next_page` 與 `openwiki_submit_page`。
4. 全部頁面完成後呼叫 `openwiki_finish`。

產生的頁面寫在本倉庫的 `openwiki/` 下。呼叫 `openwiki_begin` 時不要額外指定 `language`，除非你要改變 wiki 語言，詳見[安裝與 MCP 整合](setup.md)。

## 4. 新增文章後更新

1. 在 `docs/articles/` 新增文章筆記（工具類筆記放 `docs/articles/develop/`），格式見[參考文章收錄](articles.md)。
2. 在 `docs/articles/README.md` 的「已收錄文章」表格新增一列。
3. 請 Claude 以 `update` 模式更新 wiki。
4. 用 `openwiki_search` 確認文章已被收錄。

## 注意事項

- Claim 的證據必須使用 `repo://<path>` 格式，例如 `repo://package.json`。
- 不要手動編輯 `openwiki/` 下的頁面，這些檔案由 OpenWiki 產生。
- `openwiki/index.md` 是保留頁面，由工具自動產生，不能放進計畫。
