---
type: "Reference"
title: "OpenWiki 概覽"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-11-16T14:22:10.483Z
sources:
  - id: openwiki-source-6d4b4e707b8d60b6ccfa3425
    resource: repo://.github/workflows/openwiki-update.yml
  - id: openwiki-source-ea70eb6c045047448e446296
    resource: repo://.gitignore
  - id: openwiki-source-f5a489e5822d87c0b8fc66ef
    resource: repo://.mcp.json
  - id: openwiki-source-9186e7d6c90c3a4612a8f747
    resource: repo://docs/articles/README.md
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "opencode", at: "2026-11-16T14:22:10.483Z" }
---

# OpenWiki 概覽

本倉庫是已用 [OpenWiki](https://www.npmjs.com/package/openwiki)（npm 套件 `openwiki`，版本 `^0.7.2`）初始化的工作區。目前沒有應用程式原始碼，內容以 OpenWiki 設定、agent skills 與 `docs/articles/` 的參考文章筆記為主。

## 目前狀態

| 項目 | 狀態 |
|---|---|
| 應用程式原始碼 | 無 |
| Git 歷史 | 已有 commit（`main` 分支） |
| 相依套件 | `package.json` 宣告 `openwiki@^0.7.2` |
| MCP 整合 | 已在 `.mcp.json` 設定 openwiki 伺服器 |
| 參考文章 | `docs/articles/` 下有 3 篇，見[參考文章收錄](articles.md) |
| 排程更新 | `.github/workflows/openwiki-update.yml` 設定每日更新 wiki |

## 倉庫結構

```
.
├── .claude/                        # Claude 的 skills 與本機設定
├── .opencode/                      # opencode 的 skills 與外掛
├── .github/workflows/              # openwiki-update.yml 排程更新
├── docs/articles/                  # 使用者收集的參考文章筆記（develop/ 放工具類筆記）
├── openwiki/                       # OpenWiki 產生的頁面（請勿手動編輯）
├── graphify-out/                   # graphify 知識圖譜，僅本機（已 gitignore）
├── .mcp.json                       # 註冊 openwiki MCP 伺服器
├── AGENTS.md                       # 給代理程式的專案說明
├── README.md                       # 專案簡介
├── package.json / package-lock.json
└── node_modules/                   # 已安裝套件（不納入版本控制）
```

## 各部分如何搭配

1. `package.json` 宣告 `openwiki` 相依套件。
2. `.mcp.json` 讓 Claude 以 `node ./node_modules/openwiki/dist/cli/cli.js mcp --host claude` 啟動 MCP 伺服器。
3. `.claude/skills/openwiki/` 與 `.opencode/skills/` 說明代理程式如何使用 OpenWiki 與其他工具。
4. MCP 伺服器產生與讀取的 wiki 寫在 `openwiki/` 下。
5. `docs/articles/` 的文章筆記是 wiki 可收錄的內容來源。

## 相關頁面

- [快速開始](quickstart.md)
- [安裝與 MCP 整合](setup.md)
- [參考文章收錄](articles.md)
- [OpenCode 快捷鍵與斜線指令](opencode-shortcuts.md)
