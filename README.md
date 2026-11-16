# openwiki

已使用 [OpenWiki](https://www.npmjs.com/package/openwiki)（`openwiki@^0.7.2`）初始化的專案。目前尚無應用程式原始碼。

## 安裝

```bash
npm install
```

Claude 會依 `.mcp.json` 以 `openwiki mcp --host claude` 啟動 OpenWiki MCP 伺服器。

## 文件結構

- `openwiki/`：OpenWiki 產生的 wiki 頁面（概覽、安裝、快速開始）。由工具自動產生，請勿手動編輯。
- `docs/articles/`：你收集的參考文章。新增文章與搭配 OpenWiki 使用的方式，請見 [docs/articles/README.md](docs/articles/README.md)。

## 收錄新文章（三步驟）

OpenWiki 只收錄已放進 `docs/articles/` 的檔案。對 Claude 依序說：

1. 整理成筆記：

   ```text
   把這篇文章整理成筆記放進 docs/articles
   ```

2. 更新 wiki：

   ```text
   用 update 模式更新 openwiki
   ```

3. 之後用 wiki 查：

   ```text
   用 openwiki 查「參考文章收錄」
   ```

沒做步驟 2，`openwiki_search` 查不到新文章。

## yt-agent 影片分析用法

`yt-agent` 是 YouTube 多領域垂直分析專家（YouTube Vertical Analysis Expert），專攻股市投資（Stock Investment）、總體經濟（Macroeconomics）、軟體開發（Software Development）、AI 應用（AI Applications）。所有產出皆為繁體中文。

### 呼叫方式

直接輸入斜線指令（Slash Command，建議用法）：

```text
/yt-agent <YouTube 連結>
```

或對 Claude 說（擇一）：

```text
用 yt-agent 分析這部影片：<YouTube 連結>
```

```text
用 yt-agent 整理這份逐字稿：<貼上字幕文字>
```

URL-only 輸入時會先嘗試以 `yt-dlp --dump-json` / `yt-dlp --write-auto-sub` 抓取章節與字幕，失敗才會要求補充內容。

### 使用流程

```
[貼上連結／逐字稿] → [邊界檢查 G1-G3] → [時長判斷] → [領域路由 Route 1-5] → [結構化筆記輸出]
```

1. 貼上 YouTube 連結或逐字稿（少於 30 字且無連結會觸發 G1 要求補充）。
2. 純娛樂八卦內容觸發 G2，只給一句話摘要；內容有邏輯衝突觸發 G3，會標註 `[邏輯衝突警示]`。
3. `≤ 30 分鐘` 用標準緊湊模式；`> 30 分鐘` 按約 15 分鐘章節對齊切片，尾段 `≤ 5 分鐘` 自動合併；`> 2 小時` 每小時插入全域宏觀里程碑。
4. 輸出依固定模板：影片摘要 → 目錄時間戳 → 核心重點與案例 → 架構圖 → 結論操作指南 → 相關資源關鍵字。含架構內容時不貼 Mermaid 原始碼，一律生成架構圖。

### 收錄到 OpenWiki

分析完成後如需檢索，對 Claude 說：

```text
把這篇 yt-agent 筆記放進 docs/articles
```

```text
用 update 模式更新 openwiki
```

## 資安設定（本機）

這個 repo 是公開的，以下設定刻意只留在本機：

- **graphify 後端固定**：`graphify` 0.9.111 會自動偵測 `OPENAI_API_KEY`／`GEMINI_API_KEY`，並把 repo 內文件送給該供應商，與 skill 文件宣稱「不讀 provider key」不符。一律這樣跑：

  ```bash
  GRAPHIFY_BACKEND=claude-cli graphify .
  GRAPHIFY_BACKEND=claude-cli graphify update .
  ```

  只要 AST、不碰 LLM 時用 `GRAPHIFY_BACKEND=none`。

- **索引與自動執行檔不進版控**：`graphify-out/`、`.claude/settings.json`、`.opencode/plugins/` 已列入 `.gitignore`。hook 與 plugin 會在你每個 shell／讀檔動作前執行本機 `graphify` 二進位，公開 repo 不該讓別人 clone 後自動執行；索引含路徑與文件摘要，重建即可，不需共用。要臨時強制加入：`git add -f graphify-out/graph.json`（自行承擔公開風險）。

- **憑證檔**：`.env`、`.env.*`、`*.pem`、`*.key`、`*.p12` 已在 `.gitignore`；跑完整 graphify build 前先確認這些檔案不存在或已被忽略。

- **相依套件**：`npm audit --omit=dev` 目前 0 漏洞（原本 `openwiki@0.7.2` 的 `@azure/*`、`hono` 共 4 個已由 `npm audit fix` 修掉）。升版後請重跑。

- **MCP 版本一致**：`.mcp.json` 直接指向 `node_modules/openwiki/dist/cli/cli.js`，避免用到 Homebrew 的全域版本而與 `package.json` 不一致。
