// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Faucet {
    // event Deposit(address indexed _token, address indexed _from, uint _amount);
    event Drip(address indexed _token, address indexed _from, uint _dripAmount);
    event Withdrawal(address indexed _token, address indexed _from, uint _amount);


    address payable owner;


    // address[5] memory public tokenAddresses;

    mapping(address => uint) public dripAmounts;

    uint public lockTime = 1 minutes; // to be replaced by 24h with SetLockTime()

    mapping(address => mapping(address => uint)) nextAccessTime;


    constructor() payable {
        owner = payable(msg.sender);

        address[5] memory tokenAddresses = [
            0x1A71f491fb0Ef77F13F8f6d2a927dd4C969ECe4f,
            0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F,
            0xa7c9092A5D2C3663B7C5F714dbA806d02d62B58a,
            0x6bDE94725379334b469449f4CF49bCfc85ebFb27,
            0x8DEF68408Bc96553003094180E5C90d9fe5b88C1
        ];

        dripAmounts[tokenAddresses[3]] = 0.001 * (10**18);
        dripAmounts[tokenAddresses[4]] = 0.01 * (10**18);

        for (uint i = 0; i < tokenAddresses.length; i++) {
            dripAmounts[tokenAddresses[i]] = 10 * (10**18);
        }
    }


    function requestTokens(address tokenAddress) public {
        require(msg.sender != address(0), "Request must originate from a valid address.");

        uint dripAmount = dripAmounts[tokenAddress];
        IERC20 token = IERC20(tokenAddress);

        require(token.balanceOf(address(this)) >= dripAmount, "Faucet is dry.");
        require(block.timestamp >= nextAccessTime[msg.sender][tokenAddress], "Insufficient time elapsed since last drip.");

        bool success = token.transfer(msg.sender, dripAmount);

        if (success)
            emit Drip(tokenAddress, msg.sender, dripAmount);
            nextAccessTime[msg.sender][tokenAddress] = block.timestamp + lockTime;
    }

    receive() external payable {
        // emit Deposit(address(token), msg.sender, msg.value);
    }

    function setDripAmount(address tokenAddress, uint _dripAmount) public onlyOwner {
        require(msg.sender == owner, "Only the owner can change the drip amount.");

        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= 0, "Token not served by this faucet.");

        dripAmounts[tokenAddress] = _dripAmount;
    }

    function setLockTime(uint _numberOfHours) public onlyOwner {
        require(msg.sender == owner, "Only the owner can change the lock time.");
        lockTime = _numberOfHours * 1 hours;
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        require(msg.sender == owner, "Only the owner can withdraw the contract balance.");

        IERC20 token = IERC20(_tokenAddress);

        require(token.balanceOf(address(this)) > 0, "Insufficient balance.");

        token.transfer(owner, token.balanceOf(address(this)));

        emit Withdrawal(_tokenAddress, msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
        }
}