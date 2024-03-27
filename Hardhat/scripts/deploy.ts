import { ethers } from "hardhat";


async function _deployContract(contractName: string, ...args: Array<any>) {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...args);
  await contract.deployed();
  console.log(`Contract ${contractName} (${args}) deployed to:`, contract.address);
  return contract;
}

async function main() {
// We get the contract to deploy
  const legalETH = await _deployContract("LegalETH")
  const legalCase = await _deployContract("LegalCase")
  const legalPackages = await _deployContract("LegalPackages", legalETH.address)
  const legalManager = await _deployContract("LegalManager", legalETH.address, legalCase.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
