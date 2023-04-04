// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Sepolia Contract Address: 0x45FEa26207a5fac074A7810A18eC9EE9B5cDF23B
// Goerli Contract Address: 0x6bED992aAa79564b56A62c2341DB6C6bC0F5b247
contract NftTokenTwo is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
     using Counters for Counters.Counter;

     Counters.Counter private _tokenIdCounter;

     uint256 MAX_SUPPLY = 1000;

     constructor() ERC721("NftTokenTwo", "TWO") {}

     function safeMint(address to, string memory uri) public onlyOwner {
          require(_tokenIdCounter.current() <= MAX_SUPPLY, "Mintable NFTs reached the limit.");
          uint256 tokenId = _tokenIdCounter.current();
          _tokenIdCounter.increment();
          _safeMint(to, tokenId);
          _setTokenURI(tokenId, uri);
     }

     // The following functions are overrides required by Solidity.

     function _beforeTokenTransfer(
          address from,
          address to,
          uint256 tokenId,
          uint256 batchSize
     ) internal override(ERC721, ERC721Enumerable) {
          super._beforeTokenTransfer(from, to, tokenId, batchSize);
     }

     function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
          super._burn(tokenId);
     }

     function tokenURI(
          uint256 tokenId
     ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
          return super.tokenURI(tokenId);
     }

     function supportsInterface(
          bytes4 interfaceId
     ) public view override(ERC721, ERC721Enumerable) returns (bool) {
          return super.supportsInterface(interfaceId);
     }
}
