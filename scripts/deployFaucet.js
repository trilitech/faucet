const hre = require('hardhat');

async function main() {
  Faucet = await hre.ethers.getContractFactory('Faucet');
  faucet = await Faucet.deploy();

  await faucet.waitForDeployment();

  faucetAddress = await faucet.getAddress();

  console.log('Faucet deployed to:', faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
