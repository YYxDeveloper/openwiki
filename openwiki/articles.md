---
type: "Reference"
title: "參考文章收錄"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-11-16T14:22:10.483Z
sources:
  - id: openwiki-source-4b769cec6f285a1b25729b93
    resource: repo://docs/articles/develop/opencode-shortcuts.md
  - id: openwiki-source-9186e7d6c90c3a4612a8f747
    resource: repo://docs/articles/README.md
generated: { by: "opencode", at: "2026-11-16T14:22:10.483Z" }
---

# 參考文章收錄

`docs/articles/` 存放使用者收集的參考文章筆記。OpenWiki 只會從專案內的檔案建立 wiki，不會自行抓取網頁，所以文章必須先寫成 Markdown 檔放進這個資料夾。開發工具類筆記集中放在 `docs/articles/develop/`。

## 文章檔案格式

`docs/articles/README.md` 規定每篇文章檔案最上方記錄三項資訊：

- 來源：文章網址
- 收錄日期：`YYYY-MM-DD`
- 與本專案的關聯：一行說明

其後是筆記本文。README 也要求筆記保持精簡並附上來源網址，不要整篇貼上有版權的內容。

## 已收錄文章

| 檔案 | 標題 | 來源 | 收錄日期 |
|---|---|---|---|
| `docs/articles/develop/herdr-shortcuts.md` | herdr 快捷鍵與切換 agent | https://herdr.dev/zh-cn/tui/docs/keyboard/ | 2026-11-12 |
| `docs/articles/develop/multimodal-stt-models-2026-11.md` | 2026-11 可用的多模態與語音轉文字模型清單 | 使用者提供 | 2026-11-16 |
| `docs/articles/develop/opencode-shortcuts.md` | OpenCode 快捷鍵與斜線指令 | 使用者提供 | 2026-11-16 |

### herdr 快捷鍵

記錄 herdr（給 coding agent 用的終端機多工器）的前綴鍵 `ctrl+b` 用法、窗格／分頁／工作區切換，以及在多個 agent 之間移動的按鍵。來源頁面是中文機器翻譯版，按鍵可能隨版本改變。

### 多模態與語音轉文字模型清單

整理 2026-11 可用於音訊轉文字與多模態任務的模型端點與價格，分成 OpenCode Go 專案內建與免費（NVIDIA NIM）兩類。價格與可用性隨時變動，端點 ID 照原清單轉錄。

### OpenCode 快捷鍵與斜線指令

整理 opencode TUI 的按鍵操作：Leader Key（預設 `Ctrl + X`）的兩段式按法、介面控制、模型與 Agent 切換、工作階段管理、訊息導覽、輸入框編輯，以及 `/init`、`/models`、`/compact` 等常用斜線指令。內容詳見[OpenCode 快捷鍵與斜線指令](opencode-shortcuts.md)。

## 如何收錄新文章

1. 在 `docs/articles/` 建立 Markdown 檔，並加上上述三項檔頭資訊。
2. 在 `docs/articles/README.md` 的「已收錄文章」表格新增一列。
3. 請 Claude 以 `update` 模式更新 wiki。

不要手動編輯 `openwiki/` 下的頁面，這些檔案由 OpenWiki 產生。

## 相關頁面

- [OpenCode 快捷鍵與斜線指令](opencode-shortcuts.md)
- [概覽](overview.md)
- [快速開始](quickstart.md)
