# 專案狀態 (Project State)

## 當前進度
- **階段**：Phase 1.5 - 上架部署 (Deployed).
- **狀態**：**已上架 (Live)** - [瀏覽網站](https://web-nft-e-book.vercel.app)

## 已完成項目
- **智能合約 (Backend Asset)**：ERC-1155, USDT Payment. (Verified)
- **加密工具 (Backend Lock)**：AES-256 Encryption. (Verified)
- **前端網站 (Frontend Viewer)**：
    - **首頁**：連接錢包與模擬購買。
    - **閱讀器**：Token-Gated Access，後端驗證簽名並回傳解密內容。
    - **測試功能**：Demo Mode (Email Login) 供無錢包測試。
- **部署 (Deployment)**：
    - **Vercel**: `https://web-nft-e-book.vercel.app` (NoIndex Protected).

## 技術架構與參數 (Technical Specifications for Review)
> 供技術人員審查用

### 1. 區塊鏈參數 (Blockchain)
- **Target Network**: Polygon Amoy (Testnet) / Polygon POS (Mainnet).
- **Consensus**: Proof-of-Stake.
- **Gas Token**: MATIC (POL).
- **Payment Token**: USDT (ERC-20).

### 2. 智能合約 (Smart Contracts)
- **Standard**: **ERC-1155** (支援多種電子書不同 ID, Batch Operation).
- **Features**:
    - `mint(id, amount)`: 用戶支付 USDT 購買，合約自動檢查授權 (approve) 與餘額。
    - `adminMint(to, id, amount)`: 發行方保留免費鑄造權 (e.g. 公關品)。
    - `setURI(id, newuri)`: 支援動態更新 Metadata (Metadata 存於 IPFS)。
    - `withdraw()`: 營收提取功能 (Owner Only).
- **Security**:
    - 基於 OpenZeppelin 5.0 標準庫。
    - 使用 `Ownable` 進行權限管理。

### 3. 安全內容傳遞 (Content Delivery)
- **Encryption**: AES-256-CBC (對稱加密)。
- **Storage**:
    - **Encrypted Info**: IPFS (公開可存取，但內容被加密).
    - **Key Management**: 後端簽章驗證 (Backend Signature) 或 Lit Protocol (規劃中).
- **Access Control (Token Gating)**:
    - 前端檢查用戶是否持有該 Token ID。
    - 後端 API 再次驗證鏈上餘額，通過後釋放解密金鑰或明文內容。

## 下一步 (Phase 2)
- **部署上鏈**：將合約部署至 Polygon Amoy Testnet。
- **真實串接**：將前端的 Mock Address 替換為真實合約地址。
- **後台介面**：開發發行方專用的 Admin Dashboard。
