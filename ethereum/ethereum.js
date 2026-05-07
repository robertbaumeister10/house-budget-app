import { ethers } from "ethers";
import HouseBudgetJSON from '../artifacts/HouseBudget.sol/HouseBudget.json';

const NETWORK_NAME = import.meta.env.VITE_NETWORK_NAME || "Hardhat Local";
const RPC_URL = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545";
const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || "1337");
const CHAIN_ID_HEX = `0x${CHAIN_ID.toString(16)}`;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const NATIVE_CURRENCY_NAME = import.meta.env.VITE_NATIVE_CURRENCY_NAME || "ETH";
const NATIVE_CURRENCY_SYMBOL = import.meta.env.VITE_NATIVE_CURRENCY_SYMBOL || "ETH";
const NATIVE_CURRENCY_DECIMALS = Number(import.meta.env.VITE_NATIVE_CURRENCY_DECIMALS || "18");
const PRIVATE_KEY = (import.meta.env.VITE_PRIVATE_KEY || "").trim();

export { CONTRACT_ADDRESS };

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
    await switchNetwork();
    const signer = await provider.getSigner();
    await logWalletState(provider, signer);
    return signer;
  }
  catch(error){
    console.error("Fehler beim Wallet Connect:", error.message);
    return null;
  }
}

async function switchNetwork(){
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID_HEX }],
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: CHAIN_ID_HEX,
              chainName: NETWORK_NAME,
              nativeCurrency: {
                name: NATIVE_CURRENCY_NAME,
                symbol: NATIVE_CURRENCY_SYMBOL,
                decimals: NATIVE_CURRENCY_DECIMALS,
              },
              rpcUrls: [RPC_URL],
            },
          ],
        });
        return;
      }

      console.log(`Could not switch to ${NETWORK_NAME}!`, error);
      throw error;
    }
}

async function logWalletState(provider, signer){
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
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, HouseBudgetJSON.abi, wallet);
}

export async function ping() {
    const contract = getContract();
    return await contract.pingContract();
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

