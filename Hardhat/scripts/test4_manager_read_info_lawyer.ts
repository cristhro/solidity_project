import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const { LEGAL_MANAGER_CONTRACT_ADDRESS, LAWYER_ADDRESS } = process.env;

async function main() {
  
    const LegalManagerContract = await ethers.getContractAt('LegalManager', LEGAL_MANAGER_CONTRACT_ADDRESS);
    const lawyerInfo = await LegalManagerContract.getLawyerInfo(LAWYER_ADDRESS);
    console.log(' lawyerInfo:', lawyerInfo)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
