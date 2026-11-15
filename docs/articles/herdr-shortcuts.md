# herdr 快捷鍵與切換 agent

- 來源：https://herdr.dev/zh-cn/tui/docs/keyboard/
- 收錄日期：2026-11-12
- 與本專案的關聯：個人工具筆記，與 OpenWiki 程式碼無直接關聯
- 備註：來源頁面是中文機器翻譯版；按鍵原文照錄，功能說明為整理。快捷鍵可能隨版本改變，使用前請以 `prefix+?` 為準。

## 使用場景

在 herdr（給 coding agent 用的終端機多工器）中同時跑多個 agent，需要快速在窗格、分頁、工作區之間移動，並找出卡住或已完成的 agent。

## 前綴鍵（Prefix）

預設 `ctrl+b`：先按前綴鍵、放開，再按下一個鍵（`prefix+c` = `ctrl+b` 然後 `c`）。`prefix+?` 顯示目前所有綁定，`/` 篩選，`ctrl+u` 清除篩選。

自訂前綴鍵：

```toml
[keys]
prefix = "ctrl+a"
```

## 先學這幾個

| 按鍵 | 功能 |
|---|---|
| `prefix+c` | 新增分頁（tab） |
| `prefix+v` | 向右分割 |
| `prefix+minus` | 向下分割 |
| `prefix+h/j/k/l` | 在窗格（pane）間移動 |
| `prefix+w` | 工作區（workspace）導覽 |
| `prefix+q` | detach，所有程序繼續執行 |

## 窗格、分頁、工作區

| 類別 | 按鍵 | 功能 |
|---|---|---|
| 窗格 | `prefix+z` | 縮放目前窗格 |
| 窗格 | `prefix+x` | 關閉窗格 |
| 窗格 | `prefix+shift+h/j/k/l` | 交換窗格 |
| 窗格 | `prefix+r` | 調整大小模式 |
| 窗格 | `prefix+[` | 進入複製模式 |
| 分頁 | `prefix+n` / `prefix+p` | 下一個／上一個分頁 |
| 分頁 | `prefix+1..9` | 跳到第 1–9 個分頁 |
| 分頁 | `prefix+shift+t` | 重新命名分頁 |
| 分頁 | `prefix+shift+x` | 關閉分頁 |
| 工作區 | `prefix+shift+n` | 新增工作區 |
| 工作區 | `prefix+shift+w` | 重新命名工作區 |
| 工作區 | `prefix+shift+d` | 關閉工作區 |
| 工作區 | `prefix+b` | 切換側邊欄 |

## 切換 agent

最直接：`prefix+g` 開啟 Goto 選擇器，依工作區列出所有 agent 與終端機。

| 操作 | 按鍵 |
|---|---|
| 跳到選中的項目 | Enter 或點擊 |
| 搜尋（名稱、agent 類型、tab、workspace、branch、路徑） | `/` |
| 上下移動 | `j/k` 或 ↑/↓ |
| 跳到上一個／下一個工作區（不循環） | ←/→ |
| 只看卡住（blocked） | `b` |
| 只看執行中（working） | `w` |
| 只看閒置（idle） | `i` |
| 只看完成（done） | `d` |
| 顯示全部 | `a` |
| 離開 | Esc 或 `ctrl+[` |

找卡在等人回話的 agent：`prefix+g` → `b`。

## 複製模式（`prefix+[`）

| 按鍵 | 功能 |
|---|---|
| `h/j/k/l`、`w/b/e`、`{` `}` | 移動 |
| `/` 或 `?` | 向前／向後搜尋，`n`／`N` 重複 |
| `v`、空白鍵、`V` | 開始選取 |
| `y` 或 Enter | 複製 |
| `q` 或 Esc | 不複製並離開 |

滑鼠拖曳可直接複製。搜尋只有查詢字串含大寫時才區分大小寫。

## 免前綴的直接組合鍵（需自行設定）

| 按鍵 | 功能 |
|---|---|
| `ctrl+alt+h/j/k/l` | 焦點左／下／上／右 |
| `ctrl+alt+[` / `ctrl+alt+]` | 上一個／下一個分頁 |
| `ctrl+alt+c` | 新分頁 |
| `ctrl+alt+d` | 垂直分割 |
| `ctrl+alt+shift+d` | 水平分割 |
| `ctrl+alt+z` | 縮放 |

## 注意事項

- 組合鍵沒反應，多半是終端機或桌面環境先攔截。常被佔用的有：`ctrl+alt+方向鍵`、`ctrl+alt+t`、`ctrl+alt+l`/`a`、`ctrl+alt+s`/`u`、`ctrl+alt+f1..f12`。
- 窗格內的輸入遵循執行中 app 要求的鍵盤模式；一般 shell 中 `ctrl+shift+字母` 會變成控制字元，Super／Hyper／Meta 組合會被丟棄。
- 文字輸入框（對話框、branch 名稱、篩選）有自己的編輯鍵，剪下的內容不進系統剪貼簿。細節見來源頁面。
- 未涵蓋：「按鍵綁定參考」設定文件（來源頁面連結，未讀取）。
