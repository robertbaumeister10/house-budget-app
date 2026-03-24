import { ethers } from "ethers";
import TestContractJSON from "../src/TestContract.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PRIVATE_KEY = (import.meta.env.VITE_PRIVATE_KEY || "").trim();

function assertValidPrivateKey(privateKey) {
  if (!privateKey) {
    throw new Error("VITE_PRIVATE_KEY fehlt. Bitte in .env setzen.");
  }

  if (!ethers.isHexString(privateKey, 32)) {
    throw new Error("VITE_PRIVATE_KEY ist ungueltig. Erwartet wird ein 32-Byte Hex-Wert mit 0x-Prefix.");
  }
}

export function getContract() {
  assertValidPrivateKey(PRIVATE_KEY);
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, TestContractJSON.abi, wallet);
}

export async function ping() {
    const contract = getContract();
    await contract.pingTest();
}

