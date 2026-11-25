# 如何搭配 OpenWiki 使用新文章

OpenWiki 是從專案內的檔案建立 wiki，不會自行抓取網頁。你找到一篇新文章時，有兩種做法。

## 做法一：把文章加入 repo

當文章和本專案相關、需要和程式碼放在一起時使用。

1. 在這個資料夾建立 Markdown 檔，例如 `docs/articles/<主題>.md`。
2. 在檔案最上方記錄來源與日期：

   ```markdown
   # <文章標題>

   - 來源：<URL>
   - 收錄日期：YYYY-MM-DD
   - 與本專案的關聯：<一行說明>

   ## 筆記
   ...
   ```

3. 請 Claude 更新 wiki，它會以 `update` 模式呼叫 `openwiki_begin`。
4. 用 `openwiki_search` 確認 wiki 已收錄這篇文章。

## 做法二：不改動 wiki，直接詢問文章內容

當你只想閱讀或理解文章時使用。

- 把文章網址和你的問題交給 Claude，`anal-domain` 技能會在該網站內搜尋，並附上來源連結與原文引用。

## 已收錄文章

| 檔案 | 標題 | 來源 | 收錄日期 |
|---|---|---|---|
| [herdr-shortcuts.md](./develop/herdr-shortcuts.md) | herdr 快捷鍵與切換 agent | https://herdr.dev/zh-cn/tui/docs/keyboard/ | 2026-11-12 |
| [multimodal-stt-models-2026-11.md](./develop/multimodal-stt-models-2026-11.md) | 2026-11 可用的多模態與語音轉文字模型清單 | 使用者提供 | 2026-11-16 |
| [pstack-teaching-decks.md](./develop/pstack-teaching-decks.md) | pstack 教學簡報與心得頁（HTML） | https://github.com/cursor/plugins/tree/main/pstack | 2026-11-25 |

## 注意事項

- 請勿手動編輯 `openwiki/` 下的檔案，這些檔案由 OpenWiki 產生。
- 文章筆記請保持精簡並附上來源網址，不要整篇貼上有版權的文章內容。
