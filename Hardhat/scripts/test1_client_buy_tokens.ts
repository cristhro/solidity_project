import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const {  LEGAL_MANAGER_CONTRACT_ADDRESS, LEGAL_ETH_CONTRACT_ADDRESS } = process.env;

async function main() {
    const LegalETHContract = await ethers.getContractAt('LegalETH', LEGAL_ETH_CONTRACT_ADDRESS);
    const LegalManagerContract = await ethers.getContractAt('LegalManager', LEGAL_MANAGER_CONTRACT_ADDRESS);
    const tx = await LegalManagerContract.buyLegalETH(100);
    await tx.wait();
    console.log('Client bought 100 LegalETH: ' + tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
