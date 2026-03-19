import { ping, whitelistAddress } from "../ethereum";
import { Button, Heading, HStack, Input, SimpleGrid, Stack, Tabs, Text } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import { useState } from "react";

function PaymentPage() {
  const [address, setAddress] = useState("0xh123");

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
      errorMessage: "Contract could not be called!",
      action: ping,
    });
  };

  const callWhitelistAddress = async () => {
    await executeContractAction({
      startMessage: "Try to whitelist address...",
      successMessage: "Address is whitelisted!",
      errorMessage: "Address could not be whitelisted.",
      action: () => whitelistAddress(address),
    });
  };

  return (
    <Stack gap={6} p={6}>
      <Stack gap={2}>
        <Heading size="xl">Payment</Heading>
        <Text color="gray.600">
          Hier kannst du Contract-Aktionen und deine ersten UI-Bausteine testen.
        </Text>
      </Stack>

      <HStack gap={3} wrap="wrap">
        <Button
          bg="#2563EB"
          color="white"
          fontWeight="500"
          _hover={{ bg: "#1D4ED8" }}
          onClick={callContract}
        >
          Call Contract
        </Button>
        <Input
          maxW="320px"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Wallet address"
          bg="white"
          borderColor="#CBD5E1"
        />
        <Button
          variant="outline"
          borderColor="#CBD5E1"
          color="#334155"
          fontWeight="500"
          bg="white"
          _hover={{ bg: "#F8FAFC", borderColor: "#94A3B8" }}
          onClick={callWhitelistAddress}
        >
          Whitelist Address
        </Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="14" width="full">
        <Tabs.Root defaultValue="members">
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
          <Tabs.Content value="members">Manage your team members</Tabs.Content>
          <Tabs.Content value="projects">Manage your projects</Tabs.Content>
          <Tabs.Content value="tasks">
            Manage your tasks for freelancers
          </Tabs.Content>
        </Tabs.Root>
      </SimpleGrid>
    </Stack>
  );
}

export default PaymentPage;