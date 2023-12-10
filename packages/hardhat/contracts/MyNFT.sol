// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {Base64} from "base64-sol/base64.sol";
import {MyBot} from "./MyBot.sol";
import {ERC6551Account} from "./ERC6551Account.sol";
import {ERC6551Registry} from "./ERC6551Registry.sol";


contract MyNFT is ERC721, Ownable {

    mapping (uint256 => address) bots;

    uint256 public totalSupply; // The total number of tokens minted on this contract
    address public immutable implementation; // The Piggybank6551Implementation address
    ERC6551Registry public immutable registry; // The 6551 registry address
    uint public immutable chainId = block.chainid; // The chainId of the network this contract is deployed on
    address public immutable tokenContract = address(this); // The address of this contract
    uint salt = 0; // The salt used to generate the account address
    uint public immutable maxSupply; // The maximum number of tokens that can be minted on this contract

    uint64 subscriptionId;

    constructor(
        address initialOwner,
        address _implementation,
        address _registry,
        uint _maxSupply
    ) ERC721("myNFT", "NFT") Ownable(){
        _transferOwnership(initialOwner);
        implementation = _implementation;
        registry = ERC6551Registry(_registry);
        maxSupply = _maxSupply;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
        createAccount(tokenId);
    }

    function getAccount(uint tokenId) public view returns (address) {
        return
            registry.account(
                implementation,
                chainId,
                tokenContract,
                tokenId,
                salt
        );
    }

    function createAccount(uint tokenId) public returns (address) {
        return
            registry.createAccount(
                implementation,
                chainId,
                tokenContract,
                tokenId,
                salt,
                ""
            );
    }

    function executeFunction(uint tokenId, string[] calldata args) external payable{
        ERC6551Account acc = ERC6551Account(payable(getAccount(tokenId)));
        acc.executeFunction(subscriptionId, args);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        string[] memory uriParts = new string[](4);

        string memory uri = string.concat(uriParts[0], Base64.encode(abi.encodePacked(uriParts[1], uriParts[2], uriParts[3])));

        return uri;
    }
}