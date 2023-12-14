require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.20',
  networks: {
    mainnet: {
      url: process.env.ETHEREUM_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1,
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5,
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
    etherlinkTestnet: {
      url: process.env.ETHERLINK_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 128123,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      etherlinkTestnet: process.env.ETHERSCOUT_API_KEY,
    },
    customChains: [
      {
        network: 'etherlinkTestnet',
        chainId: 128123,
        urls: {
          apiURL: 'https://explorer.etherlink.com/api',
          browserURL: 'https://explorer.etherlink.com',
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
