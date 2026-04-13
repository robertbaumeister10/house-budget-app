import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PRIVATE_KEY = (import.meta.env.VITE_PRIVATE_KEY || "").trim();

// function assertValidPrivateKey(privateKey) {
//   if (!privateKey) {
//     throw new Error("VITE_PRIVATE_KEY fehlt. Bitte in .env setzen.");
//   }

//   if (!ethers.isHexString(privateKey, 32)) {
//     throw new Error("VITE_PRIVATE_KEY ist ungueltig. Erwartet wird ein 32-Byte Hex-Wert mit 0x-Prefix.");
//   }
// }


export async function connectWallet(){
  try{
    if(!window.ethereum) {
      throw new Error("MetaMask nicht installiert");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    await switchNetwork(provider, signer);
    return signer;
  }
  catch(error){
    console.error("Fehler beim Wallet Connect:", error.message);
    return null;
  }
}

async function switchNetwork(provider, signer){
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia
      });
    } catch (error) {
      console.log("Could not switch to Sepolia Network!", error);
    }

    
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(address);

    console.log("Wallet verbunden!");
    console.log("Wallet address:", address);
    console.log("Network:", network.name);
    console.log("ChainId:", network.chainId);
    console.log("Balance (wei):", balance.toString());
    console.log("Balance (ETH):", ethers.formatEther(balance));
}


export function getContract() {
  // assertValidPrivateKey(PRIVATE_KEY);
  // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  // const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  // return new ethers.Contract(CONTRACT_ADDRESS, TestContractJSON.abi, wallet);
}

export async function ping() {
    const contract = getContract();
    await contract.pingTest();
}

export async function getETHPrice() {
  console.log("Try to get ETH Price in getEHTPrice function");
  const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=stats&action=ethprice&apikey=${import.meta.env.VITE_ETHSCAN_API}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

