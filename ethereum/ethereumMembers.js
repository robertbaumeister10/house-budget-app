import { ethers } from "ethers";
import { getContract } from "./ethereum";

export async function addHouseMember(memberName, memberAddress, memberBalance, memberDebt){
    const contract = getContract();
    const validAddress = ethers.getAddress(memberAddress);
    return contract.addHouseMember(memberName, validAddress, memberBalance, memberDebt);
}

export async function deleteHouseMember(memberAddress){
    const contract = getContract();
    const validAddress = ethers.getAddress(memberAddress);
    return contract.deleteHouseMember(validAddress);
}

