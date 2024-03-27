import { ethers } from "hardhat";


async function _deployContract(contractName: string) {
  const Contract = await ethers.getContractFactory("LegalETH");
  const contract = await Contract.deploy();
  await contract.deployed();
  return contract;
}

async function main() {
// We get the contract to deploy
  const legalETH = await _deployContract("LegalETH")

  console.log("Contract disney deployed to:", legalETH.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
