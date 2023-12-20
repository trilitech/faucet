const contractAddresses = require('../constants/contractAddresses.json');
const hre = require('hardhat');

async function main() {
  // Get the faucet contract instance deployed on etherlinkTestnet
  const faucetAddress = contractAddresses.Faucet;
  const tokenAddress = contractAddresses.eUSD;

  const Faucet = await ethers.getContractFactory('Faucet');
  const faucet = await Faucet.attach(faucetAddress);

  // Call the requestTokens() function of the deployed Faucet contract
  await faucet.requestTokens(tokenAddress);

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.attach(tokenAddress);
  const tokenSymbol = await token.symbol();

  // Faucet balance
  const faucetBal = await token.balanceOf(faucetAddress);
  const adjFaucetBal = BigInt(faucetBal) / BigInt(10) ** BigInt(18);

  console.log('Faucet balance:', adjFaucetBal.toString(), tokenSymbol);

  // Dev account balance
  const devAccountBal = await token.balanceOf('0x7a2d40F9c3B4c5ff1f6a7549E24aaA3F94c1b3BE');
  const adjDevAccountBal = BigInt(devAccountBal) / BigInt(10) ** BigInt(18);

  console.log('Dev account balance:', adjDevAccountBal.toString(), tokenSymbol);

  // // Drip Faucet
  // const dripAmount = await faucet.dripAmount();
  // const adjDripAmount = BigInt(dripAmount) / BigInt(10) ** BigInt(18);
  // console.log('Faucet was dripped for:', adjDripAmount.toString(), tokenSymbol);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
