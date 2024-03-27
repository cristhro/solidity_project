import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
/* import "@openzeppelin/hardhat-upgrades"; */


const chainIds = {
  eth_goerli_id: 5,
  eth_sepolia_id: 11155111,
  polygon_mumbai_id: 80001,
  bsc_testnet_id: 97,
};

const { //This variables must be in the .env file, in order to work (like .env.example)
  SIGNER_MANAGER_PRIVATE_KEY,
  SIGNER_LAWYER_PRIVATE_KEY,
  SIGNER_CLIENT_PRIVATE_KEY,
  ETH_SEPOLIA_TESTNET_RPC,
  ETH_SCAN_API_KEY,
} = process.env;


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    ethereum_sepolia_testnet_as_lawyer: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_LAWYER_PRIVATE_KEY !== undefined ? [SIGNER_LAWYER_PRIVATE_KEY] : []
    },
    ethereum_sepolia_testnet_as_manager: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_MANAGER_PRIVATE_KEY !== undefined ? [SIGNER_MANAGER_PRIVATE_KEY] : []
    },
    ethereum_sepolia_testnet_as_client: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_CLIENT_PRIVATE_KEY !== undefined ? [SIGNER_CLIENT_PRIVATE_KEY] : []
    },
  },
  etherscan: {
    apiKey: {
        sepolia: ETH_SCAN_API_KEY,
    }
  },
  mocha: {
    timeout: 0
  }
};

export default config;
