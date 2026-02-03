# Phase 1 Frontend User Guide

## 1. 這是什麼？
這是電子書平台的 **網頁介面 (Reader interface)**。
它已經整合了：
- **錢包連接** (RainbowKit)。
- **USDT 購買模擬** (目前是 Mock 模式，連接測試網)。
- **閱讀器**：驗證簽名後，自動解鎖並顯示電子書。

## 2. 如何啟動？ (How to Run)
請在終端機執行以下指令：

```bash
cd h:/AG_task/NFT_eBook/frontend
npm run dev
```

接著打開瀏覽器，前往： `http://localhost:3000`

## 3. 操作流程
1.  **首頁 (/)**：點擊右上角 "Connect Wallet" 連接您的錢包 (Metamask 等)。
2.  **購買**：點擊 "Buy with USDT" (模擬交易)。
3.  **閱讀**：購買成功後，點擊 "Read Now" 或前往 `/read`。
4.  **解鎖**：在閱讀頁點擊 "Unlock Book"，錢包會跳出「簽名請求 (Sign Message)」。
5.  **成功**：簽名後，畫面應該會顯示電子書內容。

## 4. 下一步 (Phase 2) Preview
目前的 `Mock Address` 和 `Mock Verification` 需要在 Phase 2 替換為真實的 Polygon 合約地址與後端驗證邏輯。
但目前的版本已足夠展示完整的 **"Connect -> Buy -> Sign -> Read"** 體驗流程。
