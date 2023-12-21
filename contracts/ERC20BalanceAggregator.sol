// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20BalanceAggregator {
    address owner;
    address[] tokenAddresses;

    constructor() {
        owner = payable(msg.sender);

        tokenAddresses = [
            0x1A71f491fb0Ef77F13F8f6d2a927dd4C969ECe4f,
            0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F,
            0xa7c9092A5D2C3663B7C5F714dbA806d02d62B58a,
            0x6bDE94725379334b469449f4CF49bCfc85ebFb27,
            0x8DEF68408Bc96553003094180E5C90d9fe5b88C1
        ];
    }

    function fetchBalances(address user) external view returns (uint256[] memory) {
    
        uint256[] memory balances = new uint256[](tokenAddresses.length);

        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            balances[i] = IERC20(tokenAddresses[i]).balanceOf(user);
        }

        return balances;
    }

    function setTokenAddresses(address[] memory _tokenAddresses) external {
        require(msg.sender == owner, "Only the owner can set the token addresses.");
        tokenAddresses = _tokenAddresses;
    }
}