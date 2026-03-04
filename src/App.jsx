import { ping, whitelistAddress } from "./ethereum";

function App() {

  const callContract = async () => {
    console.log("Try to call contract!");
    try{
      await ping();
      console.log("Contract called!");
    }
    catch{
      console.log("Contract could net be called!");
    }
  }

  const callWhitelistAddress = async (address) => {
    console.log("Try to whitelist address...");
    try{
      await whitelistAddress(address);
      console.log("Address is whitelisted!");
    }
    catch{
      console.log("Address could not be whitelisted.");
    }         
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div><button onClick={callContract}>Call Contract!</button></div>
      <button onClick={() => callWhitelistAddress("0xh123")}>Whitelist Address</button>
    </div>
  );
}

export default App;


//Design

/*Tabs
Contractinfo|Whitelist|Housemembers|Payment|Debts
*/