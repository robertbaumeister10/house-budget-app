import { ethers } from "ethers";
import { getContract } from "./ethereum";

export async function addWhitelistAddresses(address) {
  console.log("try to call addAddresses", address);
  const contract = getContract();
  const validAddress = ethers.getAddress(address);
  return contract.addAddress(validAddress);
}

export async function deleteWhitelistAddresses(address) {
  console.log("try to call deleteAddresses", address);
  const contract = getContract();
  const validAddress = ethers.getAddress(address);
  return contract.deleteAddress(validAddress);
}

export async function getWhitelist(){
    console.log("Get Whiteliste!");
    const contract = getContract();
    return contract.getWhitelistList();
}