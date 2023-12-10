const hre = require('hardhat');

async function main() {
  Token = await hre.ethers.getContractFactory('Token');
  token = await Token.deploy(10000000000);

  await token.waitForDeployment();

  tokenAddress = await token.getAddress();

  console.log('Token deployed to:', tokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
