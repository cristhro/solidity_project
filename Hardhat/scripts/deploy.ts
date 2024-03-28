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
  const legalETHContract = await _deployContract("LegalETH")
  const legalCaseContract = await _deployContract("LegalCase")
  const legalPackagesContract = await _deployContract("LegalPackages", legalETHContract.address)
  const legalManagerContract = await _deployContract("LegalManager", legalETHContract.address, legalCaseContract.address)

  const tx = await legalETHContract.setOwner(legalManagerContract.address)
  await tx.wait()
  console.log('🚀 ~ main ~ tx:', tx)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
