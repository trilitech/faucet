const hre = require('hardhat');

async function main() {
  // Get the faucet contract instance deployed on etherlinkTestnet
  const address = '0xA91e9023289eF25E09131d9dC42d03Af7d8aB16C';
  const Faucet = await ethers.getContractFactory('Faucet');
  const faucet = await Faucet.attach(address);

  // Call the requestTokens() function of the deployed Faucet contract
  await faucet.requestTokens();
  const dripAmount = await faucet.dripAmount();
  const adjustedDripAmount = dripAmount / 10 ** 18;
  console.log('Faucet was dripped for: ', adjustedDripAmount.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
