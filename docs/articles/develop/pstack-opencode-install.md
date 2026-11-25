# pstack 在 opencode CLI 上的安裝與限制

- 來源：https://github.com/cursor/plugins/tree/main/pstack 、https://cursor.com/marketplace/cursor/pstack 、https://flaviocopes.com/pstack/
- 收錄日期：2026-11-20
- 與本專案的關聯：個人工具鏈筆記，記錄如何在 opencode 使用 Cursor 官方外掛 pstack，與 OpenWiki 程式碼無直接關聯
- 備註：實測於 opencode（macOS），pstack 技能數 58；上游持續更新，安裝步驟可能隨版本改變

## 使用場景

想讓 coding agent 依「先復現、先讀懂、先定架構、用真實產物驗證」的流程工作，而不是一次吐出大量程式碼。pstack 是 Lauren Tan（@poteto）為 Cursor 寫的外掛，技能本體是 `SKILL.md`，因此可移植到其他支援 Agent Skills 的 CLI。

## pstack 是什麼

- 定位：不是 prompt 大全，而是把資深工程師的流程固定成可重複執行的技能與劇本。核心主張「if you want to go fast, go deep first」，目標是少寫、寫對、拿得出證據。
- 規模（2026-11 快照）：58 個技能、22 個 `poteto-mode` 任務劇本、24 條工程原則、2 個子代理（`poteto-agent`、`comment-sicko`）。
- 入口：`poteto-mode` 當路由，依任務挑劇本再呼叫其他技能；常用技能包含 `architect`、`pstack-tdd`、`unslop`、`interrogate`、`blast-radius`、`benchmark-checklist`。
- 授權：MIT。

## 安裝到 opencode

opencode 沒有 `/add-plugin` 或 `/plugin marketplace add`，只認技能來源，因此改用「目錄即技能」的方式掛載。

```bash
# 1) 只抓 pstack 目錄，避免整個外掛倉庫
git clone --depth 1 --filter=blob:none --sparse https://github.com/cursor/plugins ~/.config/opencode/vendor/cursor-plugins
git -C ~/.config/opencode/vendor/cursor-plugins sparse-checkout set pstack

# 2) 複製技能到 opencode 全域技能目錄
mkdir -p ~/.config/opencode/skills/pstack
cp -R ~/.config/opencode/vendor/cursor-plugins/pstack/skills/. ~/.config/opencode/skills/pstack/
```

另一種做法是在 `opencode.json` 的 `skills` 陣列直接指向 `.../pstack/skills`，但複製較不易受 symlink 與路徑解析差異影響。

### 必須處理的 ID 衝突

pstack 也有 `tdd`、`teach`，而 opencode 的技能 ID 取自目錄名，同名會覆蓋既有技能（`~/.config/opencode/skills` 優先於 `~/.claude/skills`、`~/.agents/skills`）。做法是改名並修正內部引用：

```bash
mv ~/.config/opencode/skills/pstack/tdd   ~/.config/opencode/skills/pstack/pstack-tdd
mv ~/.config/opencode/skills/pstack/teach ~/.config/opencode/skills/pstack/pstack-teach
```

同時要改掉指向舊路徑的地方：

- `pstack/poteto-help/SKILL.md`：`../tdd/SKILL.md`、`../teach/SKILL.md`
- `pstack/poteto-mode/playbooks/bug-fix.md`：內文提到的 `**tdd**` 技能名
- 兩個技能 frontmatter 的 `name`（僅顯示名稱，ID 仍由目錄決定）

### 子代理轉換

`pstack/agents/*.md` 是 Cursor 格式，需改寫成 opencode 格式後放進 `~/.config/opencode/agent/`：

- 刪掉 `is_background: true`
- 刪掉 Cursor 專屬模型 slug（如 `claude-opus-5-5-xhigh-fast`），要指定就改成 `provider/model`
- 補上 `mode: subagent`
- 把 `poteto-agent` 內文「搜尋 `~/.cursor/plugins/`」的 fallback 改成實際安裝路徑

## 驗證方式

```bash
opencode debug skill | grep -c pstack      # 應為 58
opencode debug agent poteto-agent          # 應顯示 mode: subagent
opencode run "@poteto-mode 驗證測試…"       # 應出現 Skill "poteto-mode" 載入
```

實測 `opencode run "@poteto-mode …"` 會以 skill 工具載入，能解析技能自己的基準目錄（`playbooks/` 可讀），`poteto-mode` 因 `disable-model-invocation: true` 不會出現在自動建議清單，需用 `@poteto-mode` 顯式叫用。

## 已知限制（Cursor 專屬，會失效）

- `cursor-team-kit` 外掛的 `/deslop`、`control-ui`、`control-cli` 不存在。
- `setup-pstack` 會嘗試寫 `~/.cursor/rules/pstack-models.mdc`；opencode 沒有對應機制，模型分工要改成在各 agent 檔設定 `model`。
- `/loop`、Projects／automations、per-role 模型選擇無法使用。
- 部分技能假設 Cursor 的 Task 工具與 `generalPurpose` 代理名稱，opencode 需以 `task` + `general` 對應。

## 更新方式

```bash
git -C ~/.config/opencode/vendor/cursor-plugins pull
cp -R ~/.config/opencode/vendor/cursor-plugins/pstack/skills/. ~/.config/opencode/skills/pstack/
# 更新後需重做 ID 改名與引用修正（上游若新增同名技能也要重新檢查衝突）
```

## 成本提醒

subagent 與 review panel 會增加 token 消耗。不需要嚴格流程的小改動直接一般對話即可，`poteto-mode` 留給需要驗證與審查的工作。

## 參考

- pstack README：https://github.com/cursor/plugins/blob/main/pstack/README.md
- 官方指南：https://github.com/cursor/plugins/tree/main/pstack/docs/guide
- Marketplace 頁：https://cursor.com/marketplace/cursor/pstack
- 第三方深入介紹：https://flaviocopes.com/pstack/
- 本地既有整理：`ptt-pstack-58-skills.html`（PTT Soft_Job 心得，含逐字稿重點）
