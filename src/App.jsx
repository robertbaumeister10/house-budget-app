import { pingTest } from "./ethereum";

function App() {

  const callContract = async () => {
    console.log("Try to call contract!");
    try{
      await pingTest();
      console.log("Contract called!");
    }
    catch{
      console.log("Contract could net be called!");
    }

  }

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div><button onClick={callContract}>Call Contract!</button></div>
    </div>
  );
}

export default App;