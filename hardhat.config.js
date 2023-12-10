require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.20',
  networks: {
    mainnet: {
      url: 'https://eth-mainnet.alchemyapi.io/v2/<API_KEY>',
    },
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/<API_KEY>',
    },
    etherlinkTestnet: {
      url: process.env.ETHERLINK_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 128123,
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
  },
};
