import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const {  LEGAL_CASE_CONTRACT_ADDRESS } = process.env;

async function main() {
  
    const LegalCase = await ethers.getContractAt('LegalCase', LEGAL_CASE_CONTRACT_ADDRESS);
    const tx = await LegalCase.mintLegalCase('case_1000');
    await tx.wait();
    console.log('Client bought 100 LegalETH: ' + tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
