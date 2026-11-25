# OpenCode 快捷鍵與斜線指令

- 來源：使用者提供
- 收錄日期：2026-11-16
- 與本專案的關聯：個人工具筆記，可直接對照本專案使用的 opencode CLI
- 備註：快捷鍵可能隨版本改變。可用 `Ctrl + Alt + K`（which-key）查看目前綁定，或於 `~/.config/opencode/opencode.json`、`tui.json` 的 `"keybinds"` 區塊自訂；設為 `"none"` 可停用。

## 使用場景

在 opencode TUI 中操作時，需要快速開啟指令、切換模型、管理對話，或只想確認某個動作該按什麼。

## Leader Key（前導鍵）

多數指令依賴 **Leader Key**，預設為 `Ctrl + X`。

用法：先按下並放開 `Ctrl + X`，接著在 2 秒內按下第二個鍵（**不要**兩個鍵同時按住不放）。

例：`Ctrl + X` 放開後按 `B` = 切換側邊欄。

## 通用與介面控制

| 功能 | 快捷鍵 | 說明 |
| --- | --- | --- |
| 指令面板（Command Palette） | `Ctrl + P` | 搜尋並執行任何指令 |
| 切換側邊欄 | `Ctrl + X` 後按 `B` | 顯示或隱藏檔案／工作階段側邊欄 |
| 開啟外部編輯器 | `Ctrl + X` 後按 `E` | 使用系統預設的 `$EDITOR` 編輯提示詞 |
| 切換佈景主題 | `Ctrl + X` 後按 `T` | 開啟配色主題選單 |
| 檢視系統狀態 | `Ctrl + X` 後按 `S` | 查看連線、LSP 與 Token 狀態 |
| 顯示按鍵提示（which-key） | `Ctrl + Alt + K` | 顯示可用的快捷鍵提示面板 |
| 暫停並背景執行 | `Ctrl + Z` | 將 opencode 丟到終端機背景 |
| 離開 opencode | `Ctrl + C`、`Ctrl + D` 或 `Ctrl + X` 後按 `Q` | 結束程式 |

## 模型與 Agent 切換

| 功能 | 快捷鍵 | 說明 |
| --- | --- | --- |
| 切換 Agent 模式 | `Tab` / `Shift + Tab` | 在 Build、Plan 或自訂 Agent 之間循環切換 |
| 選擇 Agent | `Ctrl + X` 後按 `A` | 開啟 Agent 選擇選單 |
| 選擇模型 | `Ctrl + X` 後按 `M` | 瀏覽並選擇可用的 LLM 模型 |
| 切換近期使用模型 | `F2` / `Shift + F2` | 在最近使用過的模型間切換 |
| 切換模型推理強度 | `Ctrl + T` | 切換思考／推理等級（例如 low、medium、high） |

## 工作階段（Session）管理

| 功能 | 快捷鍵 | 說明 |
| --- | --- | --- |
| 中斷／停止生成 | `Esc` | 立即中止目前的 AI 回應或工具執行 |
| 開新工作階段 | `Ctrl + X` 後按 `N` | 建立全新的對話（同 `/new`） |
| 工作階段列表 | `Ctrl + X` 後按 `L` | 瀏覽並恢復過去的對話紀錄（同 `/sessions`） |
| 壓縮對話上下文 | `Ctrl + X` 後按 `C` | 摘要並壓縮歷史紀錄以節省 Token（同 `/compact`） |
| 對話時間軸 | `Ctrl + X` 後按 `G` | 檢視對話節點並快速跳轉 |
| 匯出對話紀錄 | `Ctrl + X` 後按 `X` | 將對話匯出為 Markdown 檔（同 `/export`） |
| 重新命名工作階段 | `Ctrl + R` | 在工作階段列表中重新命名 |
| 刪除工作階段 | `Ctrl + D` | 在工作階段列表中刪除選取的項目 |
| 子 Agent 導覽 | `Ctrl + X` 後按方向鍵 | 在父對話與子 Agent 工作階段之間切換 |

## 訊息導覽與操作

| 功能 | 快捷鍵 | 說明 |
| --- | --- | --- |
| 複製最後一則訊息 | `Ctrl + X` 後按 `Y` | 將 AI 的最新回覆複製到剪貼簿 |
| 復原／重做變更 | `Ctrl + X` 後按 `U` / `R` | 還原或重做上一輪的訊息與檔案修改（同 `/undo`、`/redo`） |
| 折疊／展開程式碼 | `Ctrl + X` 後按 `H` | 隱藏或顯示程式碼區塊與提示細節 |
| 跳至頂端／底部 | `Home`（`Ctrl + G`）／`End`（`Ctrl + Alt + G`） | 快速跳到第一則或最新一則訊息 |
| 向上／向下翻頁 | `PageUp` / `PageDown` | 亦可用 `Ctrl + Alt + B` / `Ctrl + Alt + F` |
| 向上／向下半頁捲動 | `Ctrl + Alt + U` / `Ctrl + Alt + D` | 每次捲動半個畫面高度 |

## 輸入框編輯

| 功能 | 快捷鍵 | 說明 |
| --- | --- | --- |
| 送出提示詞 | `Enter` | 傳送訊息 |
| 換行 | `Shift + Enter` 或 `Ctrl + J` | 在多數終端機中 `Ctrl + J` 最穩定可靠 |
| 清空輸入框 | `Ctrl + C` | 清除目前輸入框內的所有文字 |
| 跳至行首／行尾 | `Ctrl + A` / `Ctrl + E` | 將游標移至該行開頭或結尾 |
| 以單字為單位移動 | `Alt + B` / `Alt + F` | 游標往前或往後跳一個單字 |
| 刪除至行首／行尾 | `Ctrl + U` / `Ctrl + K` | 剪下游標前或游標後的所有文字 |
| 刪除前一個單字 | `Ctrl + W` | 刪除游標左側的一個單字 |

## 常用斜線指令（Slash Commands）

| 指令 | 功能 |
| --- | --- |
| `/init` | 為目前專案建立或更新 `AGENTS.md` |
| `/models` | 切換 LLM 模型 |
| `/connect` | 新增或設定 API 供應商金鑰 |
| `/thinking` | 切換顯示模型的思考／推理過程（thinking blocks） |
| `/details` | 切換顯示工具執行的詳細資訊 |
| `/compact` | 壓縮對話歷史以釋放上下文空間 |
| `/undo` / `/redo` | 復原或重新套用上一輪的檔案修改 |

## 先學這幾個

| 按鍵 | 為什麼 |
| --- | --- |
| `Ctrl + X` 後按 `M` | 換模型最常用 |
| `Ctrl + X` 後按 `C` | 上下文變長時壓縮，省 Token |
| `Ctrl + X` 後按 `L` | 找回舊對話 |
| `Ctrl + P` | 忘記快捷鍵時的萬用入口 |
| `Ctrl + Alt + K` | 直接查目前所有綁定 |

## 自訂與停用

設定檔位置：`~/.config/opencode/opencode.json` 或 `tui.json`，於 `"keybinds"` 區塊調整。想停用某個快捷鍵，將其值設為 `"none"`。
