import { ethers } from "ethers";
import { getContract } from "./ethereum";

const contract = getContract();

function isDeletedHouseMember(member) {
    return (
        !member ||
        member.memberAddress === ethers.ZeroAddress ||
        !member.memberName
    );
}

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
        const members = await contract.getAllHouseMembers();
        return members.filter((member) => !isDeletedHouseMember(member));
    }
    catch(Error){
        console.log("Could not get all Housemembers!", Error);
    }
}

export async function activateHouseMembers(memberAddress){
    console.log("try to activate housemembers!");
    try{
        const validAddress = ethers.getAddress(memberAddress);
        return await contract.activateHouseMember(validAddress);
    }
    catch(Error){
        console.log("Could not activate Housemembers!", Error);
    }
}

export async function deactivateHouseMembers(memberAddress){
    console.log("try to deactivate housemembers!");
    try{
        const validAddress = ethers.getAddress(memberAddress);
        return await contract.deactivateHouseMember(validAddress);
    }
    catch(Error){
        console.log("Could deactivate Housemembers!", Error);
    }
}

