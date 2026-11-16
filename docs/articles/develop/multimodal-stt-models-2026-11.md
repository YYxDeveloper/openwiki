# 2026-11 可用的多模態與語音轉文字模型清單

- 來源：使用者提供（OpenCode Go 專案內建清單 ＋ 免費 NVIDIA NIM／opencode 清單），無外部網址
- 收錄日期：2026-11-16
- 與本專案的關聯：個人模型選型筆記，與 OpenWiki 程式碼無直接關聯
- 備註：價格與可用性隨時可能變動；下列端點 ID 照原清單轉錄，部分疑有重複前綴（如 `nvidia/nvidia/...`）或截斷（如 `...-contributor-f`），使用前請以實際模型目錄為準。

## 使用場景

需要「吃音訊、吐文字」的工作（會議錄音轉錄、語音備忘、影片逐字稿），或要一次處理文字＋圖像＋影片＋音訊＋PDF 的多模態任務時，先確認目前有哪些模型可用、各要多少錢，再挑端點。

## 一、OpenCode Go 專案內含（可處理音訊→文字）

| 模型 | 端點 ID | 輸入模態 | 價格（in / out，USD / 1M tokens） |
|---|---|---|---|
| Gemini 4 Argon | `opencode-go/gemini-4-argon` | text, image, video, audio, pdf | 2 / 10 |
| Gemini 4 Argon Contributor | `opencode-go/gemini-4-argon-contributor` | text, image, video, audio, pdf | 4 / 20 |
| MiMo-V2.6-Pro | `opencode-go/mimo-v2.6-pro` | text, image, audio, video | 0.435 / 0.87 |
| MiMo-V2.6-Flash | `opencode-go/mimo-v2.6-flash` | text, image, audio, video | 0.14 / 0.28 |
| MiMo V2.5 | `opencode-go/mimo-v2.5` | text, image, audio, video | 0.14 / 0.28 |
| Muse Spark 1.3 Contributor | `opencode-go/muse-spark-1.3-contributor` | text, image, video, pdf, audio | 0.1 / 0.2 |
| Muse Spark 1.2 Contributor | `opencode-go/muse-spark-1.2-contributor` | text, image, video, pdf, audio | 0.1 / 0.2 |

## 二、免費（音訊輸入、輸出文字）

| 模型 | 端點 ID | 類型 |
|---|---|---|
| Whisper Large v3 | `nvidia/openai/whisper-large-v3` | 純 STT（audio → text） |
| Nemotron 3 Nano Omni | `nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning` | 多模態 |
| nemotron-voicechat | `nvidia/nvidia/nemotron-voicechat` | 語音對話 |
| MiMo V2 Omni Free | `opencode/mimo-v2-omni-free` | 多模態 |
| MiMo V2.5 Free | `opencode/mimo-v2.5-free` | 多模態 |
| MiMo-V2.6-Flash Free | `opencode/mimo-v2.6-flash-free` | 多模態 |
| Muse Spark 1.2 Free | `opencode/muse-spark-1.2-contributor-free` | 多模態 |
| Muse Spark 1.3 Free | `opencode/muse-spark-1.3-contributor-f` | 多模態 |

## 選型速記

- **只要轉錄、零成本**：`nvidia/openai/whisper-large-v3`（純 STT），或 `opencode/mimo-v2.5-free`、`opencode/mimo-v2.6-flash-free` 等免費多模態。
- **要便宜又吃影音**：`opencode-go/mimo-v2.6-flash`（0.14 / 0.28）；要更強品質再升 `mimo-v2.6-pro`（0.435 / 0.87）。
- **要最高模態覆蓋（含 PDF）**：`opencode-go/gemini-4-argon`（2 / 10）；Contributor 版同模態但單價加倍（4 / 20）。
- **超低價多模態**：`muse-spark-1.2/1.3-contributor`（0.1 / 0.2）。

## 注意事項

- 價格單位為「每 100 萬 tokens（USD）」，實際計費以平台帳單為準。
- 免費層常有速率限制或尖峰時段排隊，量產前先壓測。
- 同一模型可能有「付費版」與「Free 版」不同端點，模型名稱相近但 ID 不同，呼叫前務必核對完整 ID。
- 本清單為 2026-11 當下狀態，之後可能新增、下架或改價；引用前請重新查證。
