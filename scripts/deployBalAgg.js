const hre = require('hardhat');

async function main() {
  Erc20BalanceAggregator = await hre.ethers.getContractFactory('ERC20BalanceAggregator');
  erc20BalanceAggregator = await Erc20BalanceAggregator.deploy();

  await erc20BalanceAggregator.waitForDeployment();

  contractAddress = await erc20BalanceAggregator.getAddress();

  console.log('ERC20BalanceAggregator contract deployed to:', contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});