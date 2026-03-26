import { ethers } from "ethers";
import { getContract } from "./ethereum";
import ERC20Abi from "./ERC20Abi.json"; 

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); 

const eurcAddress = "0x1234..."; 
const eurc = new ethers.Contract(eurcAddress, ERC20Abi, signer);
const contractAddress = "0x1234..."; 

const contract = getContract();


export async function approveEURCTransfer(amount){
    try{
        await eurc.approve(contractAddress, amount);
    }
    catch(Error){
        console.log("EURC approval failed!", Error);

    }
}