import { ethers } from "ethers";
import { getContract } from "./ethereum";

const contract = getContract();

export async function getHouseBalanceETH(){
    console.log("Get HouseBalance eth!");
    try{
        return await contract.getHouseBalance();
    }
    catch(Error){
        console.log("Could not get housebalance eth!", Error);
    }
}

export async function getHouseBalanceEURC(){
    console.log("Get HouseBalance eurc!");
    try{
        return await contract.getHouseBalanceEURC();
    }
    catch(Error){
        console.log("Could not get housebalance eurc!", Error);
    }
}

export async function getHouseDebtsETH(){
    console.log("Get housedebt eth!");
    try{
        return await contract.getHouseBalance();
    }
    catch(Error){
        console.log("Could not get housedebt eth!", Error);
    }
}

export async function getHouseDebtsEURC(){
    console.log("Get housedebt eurc!");
    try{
        return await contract.getHouseBalance();
    }
    catch(Error){
        console.log("Could not get housedebt eurc!", Error);
    }
}