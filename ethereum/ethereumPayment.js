import { ethers } from "ethers";
import { getContract, CONTRACT_ADDRESS } from "./ethereum";
import ERC20Abi from "./ERC20Abi.json"; 

const eurcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // EURC Testnet Address
const contractAddress = CONTRACT_ADDRESS;
const contract = getContract();

export async function getSigner() {
    if (!window.ethereum) {
        throw new Error("MetaMask not found");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    // Wallet verbinden (falls noch nicht passiert)
    await provider.send("eth_requestAccounts", []);

    return await provider.getSigner();
}

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

export async function sendETHtoContract(amount) {
    console.log("send ETH to Contract ", amount);

    try {
        const signer = await getSigner();

        console.log("Signer: ", signer);

        const tx = await signer.sendTransaction({
            to: contractAddress,
            value: ethers.parseEther(amount.toString())
        });

        await tx.wait();
        return tx;

    } catch (error) {
        console.log("ETH could not send to contract!", error);
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