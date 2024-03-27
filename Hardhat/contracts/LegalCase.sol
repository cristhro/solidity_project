// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LegalCase is ERC721, ERC721URIStorage, ReentrancyGuard, Ownable {
    uint256 private _currentTokenId = 0;

    constructor() ERC721("LegalCase", "LCT") {}

    // Función para crear un nuevo caso legal
    function mintLegalCase(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = _currentTokenId++;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
