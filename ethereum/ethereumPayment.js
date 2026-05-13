import { ethers } from "ethers";
import { connectWallet, getContract, CONTRACT_ADDRESS } from "./ethereum";
import ERC20Abi from "./ERC20Abi.json"; 

const eurcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // EURC Testnet Address
const contractAddress = CONTRACT_ADDRESS;

export async function getSigner() {
    if (!window.ethereum) {
        throw new Error("MetaMask not found");
    }
    return await connectWallet();
}

async function getSignedContract() {
    const signer = await getSigner();
    return getContract(signer);
}

async function getEurc() {
    const signer = await getSigner();
    return new ethers.Contract(eurcAddress, ERC20Abi, signer);
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
            const contract = await getSignedContract();
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

export async function sendETHtoContract(amount) {
    console.log("send ETH to Contract ", amount);

    try {
        const signer = await getSigner();
        const value = ethers.parseEther(amount.toString());
        const txRequest = {
            to: contractAddress,
            value
        };

        console.log("Signer: ", signer);
        console.log("ETH deposit tx:", {
            ...txRequest,
            value: value.toString()
        });

        const tx = await signer.sendTransaction(txRequest);

        await tx.wait();
        return tx;

    } catch (error) {
        console.log("ETH could not send to contract!", error);
        throw error;
    }
}

export async function payEURCtoAddress(payer, amount){
    console.log("Pay EURC to Address ", payer , amount)
    const validAddress = ethers.getAddress(payer);
    try{
        const contract = await getSignedContract();
        await contract.payEURCtoAddress(validAddress, amount);
    }
    catch(Error){
        console.log("Could not send EURC to address!", Error);
    }
}

export async function payETHtoAddress(payer, amount){
    console.log("Pay ETH to Address ", payer , amount)
    const validAddress = ethers.getAddress(payer);
    try{
        const contract = await getSignedContract();
        if (typeof contract.payment !== "function") {
            throw new Error("payment() ist im aktuellen Contract-ABI nicht verfuegbar. Bitte Contract neu kompilieren und Frontend neu starten.");
        }
        await contract.payment(validAddress, amount);
        const balanceReceipient = await contract.localNodeTestGetBalance(validAddress);
        console.log("BalanceReceipient: ", balanceReceipient);
    }
    catch(Error){
        console.log("Could not send ETH to address!", Error);
        throw Error;
    }
}
