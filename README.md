# ERC20/OFT & Faucet deployment project for Etherlink

This project demonstrates a basic Hardhat use case. It comes with 2 Solidity smart contracts and 2 deployment scripts - one for each contract.


1) Deploy an ERC20 token:
```shell
npx hardhat run --network etherlinkTestnet scripts/deploy.js
```
2) Verify the ERC20 contract you just deployed:
```shell
npx hardhat verify --network etherlinkTestnet DEPLOYED_ERC20_CONTRACT_ADDRESS 10000000000
```

Now go and replace the constructor argument in the deployFaucet.js script with DEPLOYED_ERC20_CONTRACT_ADDRESS.

3) Deploy the Faucet for that ERC20 token:
```shell
npx hardhat run --network etherlinkTestnet scripts/deployFaucet.js
```
4) Verify the Faucet contract you just deployed:
```shell
npx hardhat verify --network etherlinkTestnet DEPLOYED_FAUCET_CONTRACT_ADDRESS DEPLOYED_ERC20_CONTRACT_ADDRESS
```



### Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
