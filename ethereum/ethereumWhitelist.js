import { ethers } from "ethers";
import { getContract } from "./ethereum";

const contract = getContract();

export async function addWhitelistAddresses(address) {
  console.log("try to call addAddresses", address);
  try{ 
    const validAddress = ethers.getAddress(address);
    return await contract.addAddress(validAddress);
  }
  catch(error){
    console.log("Could not add to whitelist! ", error);
  }
}

export async function deleteWhitelistAddresses(address) {
  console.log("try to call deleteAddresses", address);
  try{
    const validAddress = ethers.getAddress(address);
    return await contract.deleteAddress(validAddress);
  }
  catch(error){
    console.log("Could not delete member from whitelist! ", error);
  }
  
}

export async function getWhitelist(){
    console.log("Get Whiteliste!");
    try{
      const contract = getContract();
      return await contract.getWhitelistList();
    }
    catch(error){
      console.log("Could not get Whitelist ", error);
    }
    
}