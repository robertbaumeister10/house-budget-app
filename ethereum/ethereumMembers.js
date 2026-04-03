import { ethers } from "ethers";
import { getContract } from "./ethereum";

export async function addHouseMember(memberName, memberAddress){
    console.log("try to add member!", memberAddress);
    const contract = getContract();
    const validAddress = ethers.getAddress(memberAddress);
    return contract.addHouseMember(memberName, validAddress);
}

export async function deleteHouseMember(memberAddress){
    console.log("try to delete member", memberAddress)
    const contract = getContract();
    const validAddress = ethers.getAddress(memberAddress);
    return contract.deleteHouseMember(validAddress);
}

export async function getAllHouseMembers(){
    console.log("try to get all housemembers!");
    try{
        await contract.getAllHouseMembers();
    }
    catch(Error){
        console.log("Could not get all Housemembers!", Error);
    }
}

