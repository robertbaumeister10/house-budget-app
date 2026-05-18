import { ethers } from "ethers";
import { getContract, CONTRACT_ADDRESS } from "./ethereum";
import { Alchemy, Network } from "alchemy-sdk";
import ERC20Abi from "./ERC20Abi.json";

const contract = getContract();
const contractAddress = CONTRACT_ADDRESS;
const eurcAddress = import.meta.env.VITE_EURC_ADDRESS;

export async function getContractBalance(){
    console.log("Get contract balance!");
    try{
        const result = await contract.getContractBalance();
        return result;
    }
    catch(error){
        console.log("Could not get contract balance! ", error);
    }
}

export async function getContractEURCBalance(){
    console.log("Get contract EURC balance!");
    try{
        const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545");
        const eurc = new ethers.Contract(eurcAddress, ERC20Abi, provider);
        return await eurc.balanceOf(contractAddress);
    }
    catch(error){
        console.log("Could not get contract EURC balance! ", error);
    }
}

export async function getFinancialOverview(){
    console.log("Get financial overview!");
    try{
        const result = await contract.getContractFinacialOverview();
        console.log("Financial Overview Result!", result);
        return result;
    }
    catch(error){
        console.log("Could not get financial overview! ", error);
    }
}

export async function getTransactionHistory(){
    console.log("Get Contract Transactionhistory!");
    const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
    if (!apiKey || apiKey === "demo") {
        console.log("Alchemy API Key not set or is demo. Skipping transaction history.");
        return [];
    }
    try{
        const config = {
        apiKey: apiKey,
        network: Network.ETH_SEPOLIA,
        };
        const alchemy = new Alchemy(config);
        const result = await alchemy.core.getAssetTransfers({
            contractAddresses: [contractAddress],
            category: ["erc20"],
        })

        console.log("Transactionhistory: ", result.transfers);
        return  result.transfers;
    }
    catch(error){
        console.log("Could not get contract transactions", error);
        return [];
    }
}
