const contractAddresses = require('../constants/contractAddresses.json');
const hre = require('hardhat');

async function main() {
  // Get the ERC20BalanceAggregator contract instance deployed on etherlinkTestnet
  const aggregatorAddress = contractAddresses.ERC20BalanceAggregator;
  const tokenAddresses = [
    contractAddresses.eUSD,
    contractAddresses.USDT,
    contractAddresses.USDC,
    contractAddresses.BTC,
    contractAddresses.ETH,
  ];

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.attach(tokenAddresses[0]);
  const tokenSymbol = await token.symbol();

  const Aggregator = await ethers.getContractFactory('ERC20BalanceAggregator');
  const aggregator = await Aggregator.attach(aggregatorAddress);

  // Call the requestTokens() function of the deployed Faucet contract
  const erc20Balances = await aggregator.fetchBalances('0x7a2d40F9c3B4c5ff1f6a7549E24aaA3F94c1b3BE');
  
  let adjErc20Balances = [];

  for (let i = 0; i < erc20Balances.length; i++) {
    adjErc20Balances[i] = BigInt(erc20Balances[i]) / BigInt(10) ** BigInt(18);
  }

  console.log("Address balance: ", adjErc20Balances[0], tokenSymbol);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
