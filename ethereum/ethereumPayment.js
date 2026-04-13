import { ethers } from "ethers";
import { getContract } from "./ethereum";
import ERC20Abi from "./ERC20Abi.json"; 

const eurcAddress = "0x1234...";
const contractAddress = "0x1234...";
const contract = getContract();

async function getEurc() {
  return new ethers.Contract(eurcAddress, ERC20Abi, getContract());
}


export async function approveEURCTransfer(amount){
    console.log("approve EURC Transfer ", amount);
    try{
        const eurc = await getEurc();
        return await eurc.approve(contractAddress, amount);
    }
    catch(Error){
        console.log("EURC approval failed!", Error);
    }
}

export async function sendEURCtoContract(amount){
    console.log("send EURC to Contract ", amount)
    if(await approveEURCTransfer(amount)){
        try{
            await contract.receiveEURCtoContract(amount);
        }
        catch(Error){
            console.log("EURC could not send to contract!", Error);
        }
    }
    else{
        console.log("Transaction not approved!");
    }

}

export async function sendETHtoContract(amount){
    console.log("send ETH to Contract ", amount)
    try{
        await contract.receive({ value: amount });
    }
    catch(Error){
        console.log("ETH could not send to contract!", Error);
    }
}

export async function payEURCtoAddress(payer, amount){
    console.log("Pay EURC to Address ", payer , amount)
    const validAddress = ethers.getAddress(payer);
    try{
        await contract.payEURCtoAddress(validAddress, amount);
    }
    catch(Error){
        console.log("Could not send EURC to address!", Error);
    }
}

export async function payETHtoAddress(payer, amount){
    console.log("Pay EURC to Address ", payer , amount)
    const validAddress = ethers.getAddress(payer);
    try{
        await contract.payment(validAddress, amount);
    }
    catch(Error){
        console.log("Could not send EURC to address!", Error);
    }
}