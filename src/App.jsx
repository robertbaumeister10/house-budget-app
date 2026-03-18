import { ping, whitelistAddress } from "./ethereum";
import { Button, HStack, Tabs } from "@chakra-ui/react";
import { For, SimpleGrid} from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

function App() {

  const executeContractAction = async ({
    startMessage,
    successMessage,
    errorMessage,
    action,
  }) => {
    console.log(startMessage);
    try {
      await action();
      console.log(successMessage);
    } catch {
      console.log(errorMessage);
    }
  };

  const callContract = async () => {
    await executeContractAction({
      startMessage: "Try to call contract!",
      successMessage: "Contract called!",
      errorMessage: "Contract could net be called!",
      action: ping,
    });
  };

  const callWhitelistAddress = async (address) => {
    await executeContractAction({
      startMessage: "Try to whitelist address...",
      successMessage: "Address is whitelisted!",
      errorMessage: "Address could not be whitelisted.",
      action: () => whitelistAddress(address),
    });
  };

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div><button onClick={callContract}>Call Contract!</button></div>
      <button onClick={() => callWhitelistAddress("0xh123")}>Whitelist Address</button>
      <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
     <SimpleGrid columns={2} gap="14" width="full">
          <Tabs.Root  defaultValue="members" >
            <Tabs.List>
              <Tabs.Trigger value="members">
                <LuUser />
                Members
              </Tabs.Trigger>
              <Tabs.Trigger value="projects">
                <LuFolder />
                Projects
              </Tabs.Trigger>
              <Tabs.Trigger value="tasks">
                <LuSquareCheck />
                Settings
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="members">
              Manage your team members
            </Tabs.Content>
            <Tabs.Content value="projects">Manage your projects</Tabs.Content>
            <Tabs.Content value="tasks">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>
    </SimpleGrid>
    </div>
  );
}

export default App;


//Design

/*Tabs
Contractinfo|Whitelist|Housemembers|Payment|Debts
Responses readeble
Response in Console/ Code
Centralized
*/