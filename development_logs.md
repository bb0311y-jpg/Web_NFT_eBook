# 專案日誌 (Development Logs)

## 2026-01-28 初始化專案
- **遇到的問題**：專案剛啟動，尚未有基礎架構。
- **嘗試歷程**：建立基礎目錄結構與文件。
- **分析與修復**：初始化 `task.md`, `development_logs.md`, `PROJECT_STATE.md`。
- **檢討思路**：確保所有後續改動都嚴格遵守日誌記錄規則。

## 2026-01-28 概念架構對齊
- **遇到的問題**：確保使用者對 NFT 電子書運作邏輯的認知與技術實作一致。
- **嘗試歷程**：使用者提出三點結構（唯一地址、資料庫、專用軟體）。
- **分析與修復**：完全吻合 Web3 架構。
    - 唯一地址 -> Smart Contract + TokenID
    - 資料庫 -> IPFS + 加密儲存
    - 專用軟體 -> Token-Gated Frontend
- **檢討思路**：已更新 `nft_ebook_strategy.md` 將此對照表列出，方便後續溝通。

## 2026-01-28 原型定義釐清
- **遇到的問題**：使用者詢問「原型」是指單純的合約，還是包含閱讀器 App。
- **分析與修復**：
    - 原型必須包含「兩端」才能驗證商業邏輯：
        1.  **資產端** (NFT 合約)
        2.  **消費端** (閱讀器介面)
    - 釐清 Phase 1 會先做 **Web App (網頁版)** 而非手機 App，以降低驗證成本。
- **檢討思路**：已更新 `nft_ebook_strategy.md` Phase 1 區塊，明確列出交付項目 (Deliverables)。

## 2026-01-28 核心價值釐清 (資產 vs 內容)
- **遇到的問題**：使用者確認「內容被盜版」與「資產持有權」的區別。
- **分析與修復**：
    - 釐清核心價值：即使 PDF 流出(盜版)，也不影響 NFT 本身的價值，因為盜版無法轉售。
    - 確立「發行權威」的重要性：唯有發行方合約鑄造的 500 份才是「真品」。
- **檢討思路**：更新策略文件，加入 "Asset vs Content" 的比較表，強調「合法且唯一的電子書授權」才是商業模式的護城河。

## 2026-01-28 發行方風險評估
- **遇到的問題**：使用者以發行方角度，詢問潛在風險與權益保障。
- **分析與修復**：
    - 識別四大風險：合約漏洞、私鑰遺失、檔案消失 (IPFS Pinning)、版稅被市場忽略。
    - 提出緩解方案：使用標準合約庫 (OpenZeppelin)、硬體錢包/多簽錢包、Arweave 永久儲存、以及版稅激勵機制。
- **檢討思路**：已將風險評估表加入 `nft_ebook_strategy.md`，特別強調版稅不確定性與儲存永久性的解決方案。

## 2026-01-28 階段性角色詳細規劃
- **遇到的問題**：使用者要求釐清各階段的功能、使用方式與發行方角色。
- **分析與修復**：
    - 將 Roadmap 重組為三個清晰階段：
        - Phase 1 (MVP)：技術驗證。發行方角色為「觀察者/測試者」。
        - Phase 2 (Platform)：後台建置。發行方角色為「出版商 (Publisher)」，操作 Dashboard 上架。
        - Phase 3 (Expansion)：行動版與生態系。發行方角色為「商務拓展 (BD)」。
- **檢討思路**：已將詳細的 Role/Feature/Flow 列表更新至 `nft_ebook_strategy.md`。

## 2026-01-28 金流串接諮詢
- **遇到的問題**：使用者不熟悉 NFT 交易模式，詢問金流如何串接。
- **分析與修復**：
    - 解說三種金流模式：
        1.  **一級市場 (Primary)**：用戶付 Crypto，合約直轉發行方錢包 (秒到帳)。
        2.  **二級市場 (Secondary)**：用戶間交易，版稅 (10%) 自動分潤給發行方。
        3.  **法幣通道 (Fiat On-Ramp)**：透過第三方 (MoonPay) 讓不懂 Crypto 的用戶刷卡購買。
    - 在策略文件中新增 Financial Flow 章節。
- **檢討思路**：金流透明度是 Web3 最大優勢 (無帳期)，應強調此點。

## 2026-01-28 貨幣策略建議
- **遇到的問題**：使用者詢問應使用法幣還是虛擬貨幣，考量稅務與系統可行性。
- **分析與修復**：
    - **系統面**：虛擬貨幣 (Crypto) 是區塊鏈原生的，開發成本最低，邏輯最乾淨。法幣 (Fiat) 需要複雜的閘道與第三方信任。
    - **穩定性面**：ETH/MATIC 波動大，不適合定價商品。
    - **建議方案**：採用 **穩定幣 (Stablecoins)** 如 USDT 或 USDC。
        - 對系統：它是 Crypto。
        - 對定價：它是法幣 (美金)。
    - **稅務備註**：在台灣銷售 NFT 屬數位勞務，無論收什麼幣都需報稅 (建議諮詢會計師)，但 USDT 的金流紀錄比現金更容易追蹤與舉證。
- **檢討思路**：更新策略文件，明確建議使用 Polygon 鏈上的 USDT/USDC 作為主要計價單位。

## 2026-01-28 進入 Phase 1 規劃
- **決策**：定調使用 **USDT** (Polygon) 作為支付貨幣。
- **行動**：
    - 撰寫 `implementation_plan.md`。
    - 採用 "Backend Signature Verification" 作為 Phase 1 的 Token-Gating 方案 (比 Lit Protocol 更輕量化)。
    - 架構：Next.js + Hardhat。
- **下一步**：等待使用者確認計畫書技術細節，隨即開始 Coding。

## 2026-01-28 啟動開發 (Phase 1 Execution)
- **狀態**：使用者核准開發計畫 (LGTM)。
- **行動**：
    - 初始化 `contracts_project` 資料夾。
    - 安裝 Hardhat 與 OpenZeppelin。
    - 準備撰寫 ERC-1155 合約。

## 2026-01-28 Hardhat ESM 修正
- **問題**：Hardhat 執行時報錯 `Hardhat only supports ESM projects`。
- **修復**：
    - 設定 `package.json` `"type": "module"`。
    - 重寫 `hardhat.config.js` 與 `test/NFTBook.js` 為 ESM 語法 (import/export)。

## 2026-01-28 Hardhat CJS 回退
- **問題**：ESM 模式下 Hardhat 插件相容性問題。
- **修復**：
    - 移除 `package.json` `"type": "module"`。
    - 使用 `hardhat.config.cjs` (明確指定 CJS)。
    - 測試檔改回 `require`。

## 2026-01-28 Hardhat Config 最終修正
- **問題**：Hardhat 預設找不到 `.cjs` 設定檔，且 `package.json` 有語法錯誤 (Trailing Comma)。
- **修復**：
    - 將 `hardhat.config.cjs` 改回 `hardhat.config.js`。
    - 修正 `package.json` JSON 格式。
- **預期**：現在環境為標準 CJS，應該可以順利執行測試。

## 2026-01-28 智能合約開發完成
- **狀態**：測試全數通過 (Hardhat v2.28.0 CJS)。
- **成果**：
    - `NFTBook.sol`: 支援 USDT 支付、價格設定、Owner 提款。
    - `NFTBook.js`: 單元測試覆蓋主要邏輯。
- **下一步**：開發加密工具 (Encryption Utility)。

## 2026-01-28 加密工具開發完成
- **成果**：開發 `utils/encryption.js`，支援 AES-256-CBC 加密與解密。
- **驗證**：產出 `book.epub` -> `book.epub.enc` -> `book.epub.dec`，確認內容一致。
- **進度**：Phase 1 "Backend" 部分 (合約 + 加密) 已完成，準備進入前端開發。

## 2026-01-28 啟動前端開發
- **目標**：建立使用者介面 (Reader App)。
- **技術棧**：Next.js 14, TailwindCSS, RainbowKit.
- **預期產出**：一個可以連錢包、買書、看書的 Web App。

## 2026-01-28 安裝前端 Web3 套件
- **行動**：安裝 `@rainbow-me/rainbowkit`, `wagmi`, `viem`, `@tanstack/react-query`。
- **目的**：提供錢包連接 (Wallet Connect) 與區塊鏈互動功能。

## 2026-01-28 前端開發完成
- **成果**：
    - `app/page.tsx`: 首頁 (連接錢包、購買按鈕)。
    - `app/read/page.tsx`: 閱讀頁 (簽名驗證、EPUB 閱讀器)。
    - `app/api/read/route.ts`: 解密 API (後端驗證與解密)。
- **整合**：已將加密書籍 (`book.epub.enc`) 部署至 `public` 資料夾。
- **狀態**：Phase 1 原型開發全數完成 (Backend + Frontend)。

## 2026-01-29 啟動伺服器 (Server Startup)
- **問題**：使用者嘗試連線 `localhost:3000` 失敗 (ERR_CONNECTION_REFUSED)。
- **原因**：尚未執行 `npm run dev` 啟動服務。
- **修復**：代為執行啟動指令。

## 2026-01-29 介面設計大改版 (Design Overhaul)
- **風格**：Sci-Fi / Cyberpunk (回應使用者需求)。
- **主要變動**：
    - 全域色系調整為深色霓虹 (Deep Dark + Neon)。
    - 字體引入 `Orbitron` (標題) 與 `Share Tech Mono` (數據)。
    - 新增 CSS Variables 支援玻璃擬態 (Glassmorphism)。

## 2026-01-29 新增多語系支援 (Language Switcher)
- **功能**：繁體中文 (zh-TW) / 英文 (en) 切換。
- **實作**：
    - `LanguageContext`: 管理全域語系狀態。
    - `LanguageSwitcher`: Header 上的切換按鈕。
    - 全站文字 (Nav, Banner, Cards, Buttons) 皆已替換為動態變數。

## 2026-01-29 建立後台原型 (Admin Prototype)
- **位置**：`/admin`
- **功能**：
    - 模擬登入 (PIN: admin123)。
    - 書籍資料編輯 (標題、作者、價格、發行量)。
    - 即時預覽 (Live Preview)。
    - 模擬上鏈流程 (Encryption -> IPFS -> Mint)。

## 2026-01-29 修復後台頁面錯誤 (Admin Page Fix)
- **問題**：Admin 頁面出現 `Parsing ecmascript source code failed` 錯誤。
- **原因**：JSX 中使用了未跳脫的 `>>` 符號 (e.g. `>> SUCCESS`)。
- **修復**：將 `>>` 更正為 `{'>>'}` 以符合 JSX 語法。

## 2026-01-29 新增書籍管理功能 (Inventory Management)
- **位置**：`/admin` -> "MANAGE INVENTORY" 分頁。
- **功能**：
    - 列出所有已上架書籍 (Mock Data)。
    - 點擊書籍可進入編輯模式。
    - 支援修改：標題 (Title)、價格 (Price)、行銷文案 (Description)。
    - 支援預覽：右側即時顯示修改後的卡片與文案效果。

## 2026-01-29 介面優化與搜尋功能 (Refinement & Search)
- **後台修正**：
    - 修復 Admin 登入確認按鈕對比度不足的問題 (改為白字)。
    - 同步前端與後台的書籍資料 (Mock Data, 共 7 本)。
- **前台新增**：
    - **搜尋功能**：首頁 Banner 下方新增搜尋欄。
    - **即時過濾**：支援搜尋「標題」與「作者」，即時篩選下方書籍列表。

## 2026-01-29 Admin Dashboard Phase 3 (Analytics)
- **新增功能**:
    - **Dashboard 首頁**: 實作數據看板 (總營收、總銷量、熱銷王)。
    - **視覺化報表**: 銷售趨勢圖 (CSS-based Bar Chart)、庫存水位進度條。
    - **管理優化**: 在儀表板直接連結「編輯庫存」功能。
- **技術調整**:
    - 修正 TypeScript 邏輯冗餘 (redundant check)。
    - 重構 Admin 頁面為三頁籤結構 (Overview, Upload, Manage)。

## 2026-01-29 Visual Tiers & Signed Editions
- **稀缺性視覺化**:
    - **Tier Tag**: 新增標籤顯示當前販售階段 (Early Bird, Standard, Final)。
    - **Progress Bar**: 新增分段式進度條，即時顯示鑄造進度 (Mint %)。
- **限量版功能**:
    - **Signed Badge**: 書籍封面右上角新增「SIGNED」雷射標籤。
    - **動態樣式**: 簽名版書籍擁有特殊的發光特效 (Glowing Border) 與獨特封面標示。

## 2026-01-29 My Library & Pro Reader
- **書櫃功能 (My Library)**:
    - **Grid View**: 書櫃展示已購買的書籍，支援「篩選」(Unread, Finished)。
    - **Ownership Check**: 僅顯示用戶錢包持有的書籍 (Mock Data)。
- **專業閱讀器 (Pro Reader)**:
    - **UI 優化**: 仿照主流電子書 APP 操作介面。
    - **個性化設置**: 支援 **字體大小** (A+/A-)、**主題切換** (Dark/Light/Sepia)。
    - **沈浸模式**: 點擊螢幕中央可切換全螢幕/選單模式。

## 2026-01-29 Hotfix: Theme Restoration
- **問題修復**: 修正全域樣式 (CSS) 導致的「白屏失效」問題。
- **解決方案**: 於 `globals.css` 強制重寫 Dark Mode 變數並補回 Neon 色票參數，恢復 Cyberpunk 風格。

## 2026-01-30 Hybrid Auth (Member System)
- **會員中心 (Member Center)**:
    - **Email Login (模擬)**: 允許用戶使用 Email/密碼登入。
    - **Custodial Wallet**: 登入即自動生成系統託管錢包 (`0x777...`)。
    - **Wallet Binding**: 支援將 MetaMask 等外部錢包綁定至會員帳號，實現多錢包資產聚合。
- **Library 優化**:
    - 新增 **「Login with Email」** 選項，降低無錢包用戶的進入門檻。
