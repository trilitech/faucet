const hre = require('hardhat');

async function main() {
  Faucet = await hre.ethers.getContractFactory('Faucet');
  faucet = await Faucet.deploy('0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F');

  await faucet.waitForDeployment();

  faucetAddress = await faucet.getAddress();

  console.log('Faucet deployed to:', faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
