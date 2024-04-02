import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const {  LEGAL_CASE_ADDRESS, LEGAL_MANAGER_CONTRACT_ADDRESS, LEGAL_ETH_CONTRACT_ADDRESS, LAWYER_ADDRESS } = process.env;

async function main() {
    const LegalManagerContract = await ethers.getContractAt('LegalManager', LEGAL_MANAGER_CONTRACT_ADDRESS);
    
    const tx = await LegalManagerContract.addLawyer(LAWYER_ADDRESS,'Cristhian', '023432432L');
    await tx.wait();
    console.log('Lawyer added to the case: ' + tx.hash);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
