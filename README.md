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
