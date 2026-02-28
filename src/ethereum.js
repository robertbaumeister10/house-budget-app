// ethereum.js
import { ethers } from "ethers";
import TestContractJSON from "./TestContract.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export function getContract() {
  // v6: kein "providers." mehr!
  console.log("Try to getContract!");
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, TestContractJSON.abi, wallet);
}

export async function pingTest() {
    console.log("try to call pingTest!");
  const contract = getContract();
  await contract.pingTest(); // view-call, kein tx.wait()
  console.log("pingTest erfolgreich!");
}