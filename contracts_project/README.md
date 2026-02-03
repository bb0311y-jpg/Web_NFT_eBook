# Phase 1 Backend Verification Guide

## 1. 這是什麼？ (What is this?)
這是電子書平台的「核心引擎」 (Backend)，包含兩個部分：
1.  **Smart Contract (`contracts/NFTBook.sol`)**：管理 USDT 支付與 NFT 發放的區塊鏈合約。
2.  **Encryption Utility (`utils/encryption.js`)**：負責對電子書檔案進行加密的工具。

目前這些程式碼都運行在您的電腦本機 (Localhost) 上，尚未公開到網路上。

## 2. 如何驗證它完成了？ (How to verify?)
雖然沒有網頁畫面，但我們可以透過「單元測試 (Unit Tests)」來驗證邏輯是否正確。

請開啟終端機 (Terminal)，輸入以下指令：

```bash
cd h:/AG_task/NFT_eBook/contracts_project
npx hardhat test
```

### 您應該會看到類似這樣的結果：
```text
  NFTBook
    ✔ Should allow minting with USDT (允許使用 USDT 購買)
    ✔ Should fail if price is not set (若未定價則無法購買)
    ✔ Should fail if USDT allowance is insufficient (餘額不足會失敗)
    ✔ Should allow owner to withdraw USDT (發行方可以提款)
```
這代表合約的邏輯 (收錢、發貨、提款) 都已經通過驗證。

## 3. 下一步是什麼？ (What's next?)
目前我們只有「引擎」，還沒有「儀表板」。
接下來的 **Frontend Development (前端開發)** 階段，我們將會建立一個網頁：
1.  讓您 "Login" (連接錢包)。
2.  讓您 "View" (查看您擁有的書籍)。
3.  按鈕操作 (點擊「購買」按鈕來觸發上述的合約邏輯)。

這個網頁將會是您與一般使用者真正看到的「平台」。
