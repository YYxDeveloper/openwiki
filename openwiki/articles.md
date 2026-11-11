---
type: "Reference"
title: "參考文章收錄"
openwiki_generated: true
verified:
  - by: openwiki/0.7.2
    at: 2026-11-11T13:06:53.166Z
sources:
  - id: openwiki-source-9186e7d6c90c3a4612a8f747
    resource: repo://docs/articles/README.md
  - id: openwiki-source-c138082aa4812c73716ea69c
    resource: repo://docs/articles/twd-depreciation-grill.md
generated: { by: "claude-code", at: "2026-11-11T13:06:53.166Z" }
---

# 參考文章收錄

`docs/articles/` 存放使用者收集的參考文章筆記。OpenWiki 只會從專案內的檔案建立 wiki，不會自行抓取網頁，所以文章必須先寫成 Markdown 檔放進這個資料夾。

## 文章檔案格式

`docs/articles/README.md` 規定每篇文章檔案最上方記錄三項資訊：

- 來源：文章網址
- 收錄日期：`YYYY-MM-DD`
- 與本專案的關聯：一行說明

其後是筆記本文。README 也要求筆記保持精簡並附上來源網址，不要整篇貼上有版權的內容。

## 已收錄文章

| 檔案 | 標題 | 來源 | 收錄日期 |
|---|---|---|---|
| `docs/articles/twd-depreciation-grill.md` | 【市場分析】台幣即將貶破33元？台幣貶值不是因為美元太強？ | https://youtu.be/iYWSvMrrX-k | 2026-11-11 |

### 台幣貶值影片拷問題庫

這份檔案是個人學習筆記，與 OpenWiki 程式碼沒有直接關聯。內容是 16 題「問題加建議答案」，分成五層：

1. 概念釐清（出口創高為何台幣仍貶、游泳池模型、美元強弱）
2. 成因拆解（外資撤出、外資持有規模、出口美元未結匯、經常帳順差與金融帳流出）
3. 政策與壓力測試（柳樹理論、央行為何不升息、美國匯率觀察名單、與歷史貶值週期比較）
4. 財富重分配與應用（升貶值的受益者與受害者、低利率低匯率的代價、分批換匯）
5. 反方檢驗（台幣升值時建議是否成立、影片因果鏈的弱點）

檔案內的數字都出自影片摘要，**未經獨立查證**。其中的資產配置建議是影片作者的觀點，不是投資建議。

## 如何收錄新文章

1. 在 `docs/articles/` 建立 Markdown 檔，並加上上述三項檔頭資訊。
2. 在 `docs/articles/README.md` 的「已收錄文章」表格新增一列。
3. 請 Claude 以 `update` 模式更新 wiki。

不要手動編輯 `openwiki/` 下的頁面，這些檔案由 OpenWiki 產生。

## 相關頁面

- [概覽](overview.md)
- [快速開始](quickstart.md)
