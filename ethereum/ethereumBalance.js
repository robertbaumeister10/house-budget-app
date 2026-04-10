import { getContract } from "./ethereum";
import { Alchemy, Network } from "alchemy-sdk";

const contract = getContract();
const contractAddress = "0x123";

export async function getFinancialOverview(){
    console.log("Get financial overview!");
    try{
        return await contract.getContractFinacialOverview();
    }
    catch(error){
        console.log("Could not get financial overview! ", error);
    }
}

export async function getTransactionHistory(){
    console.log("Get Contract Transactionhistory!");
    try{
        const config = {
        apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
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
    }
}