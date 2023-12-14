const hre = require('hardhat');

async function main() {
  Faucet = await hre.ethers.getContractFactory('Faucet');
  faucet = await Faucet.deploy('0xA33Df9576b0c6f1d0f1a57342D1dd5B4bA3D51A7');

  await faucet.waitForDeployment();

  faucetAddress = await faucet.getAddress();

  console.log('Faucet deployed to:', faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
