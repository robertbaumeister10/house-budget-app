import { ethers } from "ethers";
import { getContract } from "./ethereum";

const contract = getContract();

export async function addHouseMember(memberName, memberAddress){
    console.log("try to add member!", memberAddress);
    try{
        const validAddress = ethers.getAddress(memberAddress);
        return await contract.addHouseMember(memberName, validAddress);
    }
    catch(error){
        console.log("Could not add housemember ", error);
    }

}

export async function deleteHouseMember(memberAddress){
    console.log("try to delete member", memberAddress)
    try{
        const validAddress = ethers.getAddress(memberAddress);
        return await contract.deleteHouseMember(validAddress);
    }
    catch(error){
        console.log("Could not delete housemember ", error);
    }

}

export async function getAllHouseMembers(){
    console.log("try to get all housemembers!");
    try{
        return await contract.getAllHouseMembers();
    }
    catch(Error){
        console.log("Could not get all Housemembers!", Error);
    }
}

