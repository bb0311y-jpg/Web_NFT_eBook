const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTBook", function () {
    let NFTBook, nftBook;
    let MockUSDT, mockUSDT;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Mock USDT
        MockUSDT = await ethers.getContractFactory("MockUSDT");
        mockUSDT = await MockUSDT.deploy();
        await mockUSDT.waitForDeployment();

        // Deploy NFTBook
        NFTBook = await ethers.getContractFactory("NFTBook");
        nftBook = await NFTBook.deploy(await mockUSDT.getAddress());
        await nftBook.waitForDeployment();
    });

    it("Should set the right owner", async function () {
        expect(await nftBook.owner()).to.equal(owner.address);
    });

    it("Should allow minting with USDT", async function () {
        const tokenId = 1;
        const price = ethers.parseUnits("10", 6); // 10 USDT
        const amount = 1;

        // 1. Setup: Give addr1 some USDT
        await mockUSDT.connect(owner).mint(addr1.address, ethers.parseUnits("100", 6));

        // 2. Setup: Set price of book #1
        await nftBook.connect(owner).setPrice(tokenId, price);

        // 3. Action: addr1 approves NFTBook to spend USDT
        await mockUSDT.connect(addr1).approve(await nftBook.getAddress(), price);

        // 4. Action: addr1 mints the book
        await expect(nftBook.connect(addr1).mint(tokenId, amount))
            .to.emit(nftBook, "TransferSingle")
            .withArgs(addr1.address, ethers.ZeroAddress, addr1.address, tokenId, amount);

        // 5. Verify: Check NFT balance
        expect(await nftBook.balanceOf(addr1.address, tokenId)).to.equal(amount);

        // 6. Verify: Check USDT transfer
        expect(await mockUSDT.balanceOf(addr1.address)).to.equal(ethers.parseUnits("90", 6));
        expect(await mockUSDT.balanceOf(await nftBook.getAddress())).to.equal(price);
    });

    it("Should fail if price is not set", async function () {
        await expect(nftBook.connect(addr1).mint(1, 1)).to.be.revertedWith("Book not for sale");
    });

    it("Should fail if USDT allowance is insufficient", async function () {
        const tokenId = 1;
        const price = ethers.parseUnits("10", 6);
        await nftBook.connect(owner).setPrice(tokenId, price);

        // Give money but don't approve
        await mockUSDT.connect(owner).mint(addr1.address, ethers.parseUnits("100", 6));

        await expect(nftBook.connect(addr1).mint(tokenId, 1)).to.be.reverted; // ERC20 insufficient allowance
    });

    it("Should allow owner to withdraw USDT", async function () {
        const tokenId = 1;
        const price = ethers.parseUnits("10", 6);

        // Simulate a sale
        await mockUSDT.connect(owner).mint(addr1.address, price);
        await nftBook.connect(owner).setPrice(tokenId, price);
        await mockUSDT.connect(addr1).approve(await nftBook.getAddress(), price);
        await nftBook.connect(addr1).mint(tokenId, 1);

        // Balance check before
        const initialOwnerBalance = await mockUSDT.balanceOf(owner.address);

        // Withdraw
        await nftBook.connect(owner).withdraw();

        // Verify
        const finalOwnerBalance = await mockUSDT.balanceOf(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance + price);
        expect(await mockUSDT.balanceOf(await nftBook.getAddress())).to.equal(0);
    });
});
