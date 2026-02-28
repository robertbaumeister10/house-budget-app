// ethereum.js
import { ethers } from "ethers";
import TestContractJSON from "./TestContract.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PRIVATE_KEY = "xxx";

export function getContract() {
  console.log("Try to getContract!");
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, TestContractJSON.abi, wallet);
}

export async function pingTest() {
    console.log("try to call pingTest!");
    const contract = getContract();
    await contract.pingTest();
    console.log("pingTest erfolgreich!");
}