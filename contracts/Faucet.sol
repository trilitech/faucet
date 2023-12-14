// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Faucet {
    event Deposit(address indexed _token, address indexed _from, uint _amount);
    event Drip(address indexed _token, address indexed _from, uint _dripAmount);
    event Withdrawal(address indexed _token, address indexed _from, uint _amount);


    address payable owner;
    IERC20 public token;

    uint public dripAmount = 1 * (10**18);
    uint public lockTime = 1 minutes; // to be replaced by 24h

    mapping(address => uint) nextAccessTime;


    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);

        console.log("Token address: ", tokenAddress);
    }


    function requestTokens() public {
        require(msg.sender != address(0), "Request must originate from a valid address.");
        require(token.balanceOf(address(this)) >= dripAmount, "Faucet is dry.");
        require(block.timestamp >= nextAccessTime[msg.sender], "Insufficient time elapsed since last drip.");

        bool success = token.transfer(msg.sender, dripAmount);

        if (success)
            emit Drip(address(token), msg.sender, dripAmount);
            nextAccessTime[msg.sender] = block.timestamp + lockTime;
    }

    receive() external payable {
        emit Deposit(address(token), msg.sender, msg.value);
    }

    function getBalance() external view returns (uint) {
        return token.balanceOf(address(this));
    }

    function setDripAmount(uint _dripAmount) public onlyOwner {
        require(msg.sender == owner, "Only the owner can change the drip amount.");
        dripAmount = _dripAmount;
    }

    function setLockTime(uint _numberOfHours) public onlyOwner {
        require(msg.sender == owner, "Only the owner can change the lock time.");
        lockTime = _numberOfHours * 1 hours;
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        require(msg.sender == owner, "Only the owner can withdraw the contract balance.");
        require(token.balanceOf(address(this)) > 0, "Insufficient balance.");

        token = IERC20(_tokenAddress);
        token.transfer(owner, token.balanceOf(address(this)));

        emit Withdrawal(address(token), msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
        }
}