import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { addAddresses, deleteAddresses } from "../ethereum";
import PageIntro from "../components/PageIntro";
import { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";

function WhitelistPage() {
  const [addressToAdd, setAddressToAdd] = useState("");
  const [addressToDelete, setAddressToDelete] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleAddAddress = async () => {
    const trimmedAddress = addressToAdd.trim();

    if (!trimmedAddress) {
      setStatusMessage("Bitte eine Wallet-Adresse fuer addAddresses eingeben.");
      return;
    }

    try {
      await addAddresses(trimmedAddress);
      setAddressToAdd("");
      setStatusMessage(`addAddresses vorbereitet fuer ${trimmedAddress}.`);
    } catch (error) {
      setStatusMessage(error.message || "addAddresses konnte nicht ausgefuehrt werden.");
    }
  };

  const handleDeleteAddress = async () => {
    const trimmedAddress = addressToDelete.trim();

    if (!trimmedAddress) {
      setStatusMessage("Bitte eine Wallet-Adresse fuer deleteAddresses eingeben.");
      return;
    }

    try {
      await deleteAddresses(trimmedAddress);
      setAddressToDelete("");
      setStatusMessage(`deleteAddresses vorbereitet fuer ${trimmedAddress}.`);
    } catch (error) {
      setStatusMessage(error.message || "deleteAddresses konnte nicht ausgefuehrt werden.");
    }
  };

  return (
    <Stack gap={8} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }} pt={{ base: 1, md: 2 }}>
      <PageIntro
        title="Whitelist"
      />

      <Stack width="full" align="center" gap={4}>
        <Box
          width={{ base: "100%", lg: "70%" }}
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
        >
          {/* Add Section */}
          <Box p={6}>
            <Flex align="center" justify="space-between" mb={4}>
              <Flex align="center" gap={3}>
                <Flex
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  bg="#EFF6FF"
                  color="#2563EB"
                  flexShrink={0}
                >
                  <LuPlus size={18} />
                </Flex>
                <Box>
                  <Text fontWeight="700" color="#0F172A" fontSize="sm">Adresse hinzufügen</Text>
                </Box>
              </Flex>
            </Flex>
            <Flex gap={3}>
              <Input
                value={addressToAdd}
                onChange={(event) => setAddressToAdd(event.target.value)}
                placeholder="0x..."
                bg="#F8FAFC"
                borderColor="#E2E8F0"
                flex="1"
                _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA", bg: "white" }}
              />
              <Button
                bg="#2563EB"
                color="white"
                fontWeight="600"
                px={5}
                width="140px"
                _hover={{ bg: "#1D4ED8" }}
                onClick={handleAddAddress}
                flexShrink={0}
              >
                <LuPlus />
                Hinzufügen
              </Button>
            </Flex>
          </Box>

          {/* Divider */}
          <Box borderTop="1px solid" borderColor="#F1F5F9" />

          {/* Delete Section */}
          <Box p={6}>
            <Flex align="center" justify="space-between" mb={4}>
              <Flex align="center" gap={3}>
                <Flex
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  bg="#FEF2F2"
                  color="#B91C1C"
                  flexShrink={0}
                >
                  <LuTrash2 size={18} />
                </Flex>
                <Box>
                  <Text fontWeight="700" color="#0F172A" fontSize="sm">Adresse entfernen</Text>
                </Box>
              </Flex>
            </Flex>
            <Flex gap={3}>
              <Input
                value={addressToDelete}
                onChange={(event) => setAddressToDelete(event.target.value)}
                placeholder="0x..."
                bg="#F8FAFC"
                borderColor="#E2E8F0"
                flex="1"
                _focusVisible={{ borderColor: "#FCA5A5", boxShadow: "0 0 0 1px #FCA5A5", bg: "white" }}
              />
              <Button
                bg="#B91C1C"
                color="white"
                fontWeight="600"
                px={5}
                width="140px"
                _hover={{ bg: "#991B1B" }}
                onClick={handleDeleteAddress}
                flexShrink={0}
              >
                <LuTrash2 />
                Löschen
              </Button>
            </Flex>
          </Box>
        </Box>

        <Box
          width={{ base: "100%", lg: "70%" }}
          bg="#F8FAFC"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="xl"
          px={4}
          py={3}
        >
          <Text color="#475569">
            {statusMessage || ""}
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
}

export default WhitelistPage;