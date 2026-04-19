import { getContract, CONTRACT_ADDRESS } from "./ethereum";
import { Alchemy, Network } from "alchemy-sdk";

const contract = getContract();
const contractAddress = CONTRACT_ADDRESS;

export async function getFinancialOverview(){
    console.log("Get financial overview!");
    try{
        const result = await contract.getContractFinancialOverview();
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