const hre = require('hardhat');

async function main() {
    Faucet = await hre.ethers.getContractFactory('Faucet');
    faucet = await Faucet.deploy('0x0aa748a1EDD0A393039c136DfdA8D672B3406E54');

    await faucet.waitForDeployment();
    
    faucetAddress = await faucet.getAddress();
    
    console.log('Faucet deployed to:', faucetAddress);
    }


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  