// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTBook is ERC1155, Ownable {
    
    // The currency used for payments (USDT)
    IERC20 public usdtToken;

    // Token ID => Price in USDT (Wei, usually 6 decimals)
    mapping(uint256 => uint256) public prices;
    
    // Token ID => URI (IPFS link)
    mapping(uint256 => string) private _uris;

    constructor(address _usdtTokenAddress) ERC1155("") Ownable(msg.sender) {
        usdtToken = IERC20(_usdtTokenAddress);
    }

    function setURI(uint256 tokenId, string memory newuri) public onlyOwner {
        _uris[tokenId] = newuri;
        emit URI(newuri, tokenId);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _uris[tokenId];
    }

    function setPrice(uint256 tokenId, uint256 price) public onlyOwner {
        prices[tokenId] = price;
    }

    function mint(uint256 id, uint256 amount) public {
        uint256 price = prices[id];
        require(price > 0, "Book not for sale");
        
        uint256 totalCost = price * amount;
        
        // Transfer USDT from user to this contract
        bool success = usdtToken.transferFrom(msg.sender, address(this), totalCost);
        require(success, "USDT transfer failed");

        _mint(msg.sender, id, amount, "");
    }

    // Issuer can mint new books for free (e.g. for marketing or self)
    function adminMint(address to, uint256 id, uint256 amount) public onlyOwner {
        _mint(to, id, amount, "");
    }

    function withdraw() public onlyOwner {
        uint256 balance = usdtToken.balanceOf(address(this));
        require(balance > 0, "No USDT to withdraw");
        usdtToken.transfer(owner(), balance);
    }
}
