import { ethers } from "hardhat";

import * as dotenv from "dotenv";
dotenv.config();
const { LEGAL_CASE_ADDRESS, LEGAL_CASE_CONTRACT_ADDRESS,  LEGAL_PACKAGES_CONTRACT_ADDRESS, LEGAL_ETH_CONTRACT_ADDRESS, CLIENT_ADDRESS } = process.env;

async function main() {
      const PACKAGE_BASIC = 1;
    const PACKAGE_STANDARD = 2;
    const PACKAGE_PREMIUM = 3;

    const LegalManagerContract = await ethers.getContractAt('LegalPackages', LEGAL_PACKAGES_CONTRACT_ADDRESS, LEGAL_CASE_CONTRACT_ADDRESS );
    const tx = await LegalManagerContract.openLegalCase(PACKAGE_PREMIUM, 0.002);
    await tx.wait();
    console.log('Client bought 100 LegalETH: ' + tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
