import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { addWhitelistAddresses, deleteWhitelistAddresses, getWhitelist } from "../../ethereum/ethereumWhitelist";
import PageIntro from "../components/PageIntro";
import { useState, useEffect } from "react";
import { LuPlus, LuTrash2, LuClipboardList } from "react-icons/lu";

function WhitelistPage() {
  const [addressToAdd, setAddressToAdd] = useState("");
  const [addressToDelete, setAddressToDelete] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [whitelist, setWhitelist] = useState([]);

  useEffect(() => {
    const loadWhitelist = async () => {
      try {
        // Temporär Mock-Daten, da Backend noch nicht verbunden
        const combined = [{ name: "Hans", address: "0x123" }];
        setWhitelist(combined);
      } catch (error) {
        setStatusMessage("Fehler beim Laden der Whitelist: " + error.message);
      }
    };
    loadWhitelist();
  }, []);

  const addWhitelistAddress = async (address) => {
    if (!address) {
      setStatusMessage("Bitte eine Walletadresse zum hinzufügen eingeben.");
      return;
    }
    try{
      console.log("Addresses added!");
      await addWhitelistAddresses(address);
      setStatusMessage("Adresse erfolgreich hinzugefügt.");
      setAddressToAdd(""); // Input leeren
      // Liste neu laden
      const data = await getWhitelist();
      setWhitelist(data);
    }

    catch(error){
      setStatusMessage(error.message || "Hinzufügen konnte nicht ausgefuehrt werden.");
    }
  };

  const handleDeleteAddress = async (address) => {
    if (!address) {
      setStatusMessage("Bitte eine Walletadresse zum Löschen eingeben.");
      return;
    }
    try {
      console.log("Address deleted!");
      await deleteWhitelistAddresses(address);
      setStatusMessage("Adresse erfolgreich entfernt.");
      // Liste neu laden
      const data = await getWhitelist();
      setWhitelist(data);
    } catch (error) {
      setStatusMessage(error.message || "Löschen konnte nicht ausgefuehrt werden.");
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
                onClick={() => addWhitelistAddress(addressToAdd)}
                flexShrink={0}
              >
                <LuPlus />
                Hinzufügen
              </Button>
            </Flex>
          </Box>

          {/* Divider */}
          <Box borderTop="1px solid" borderColor="#F1F5F9" />

          {/* Whitelist List */}
          <Box p={6}>
            <Flex align="center" justify="space-between" mb={4}>
              <Flex align="center" gap={3}>
                <Flex
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  bg="#F0FDF4"
                  color="#166534"
                  flexShrink={0}
                >
                  <LuClipboardList size={18} />
                </Flex>
                <Box>
                  <Text fontWeight="700" color="#0F172A" fontSize="sm">Whitelist ({whitelist.length})</Text>
                </Box>
              </Flex>
            </Flex>
            <Stack gap={3}>
              {whitelist.map((item, index) => (
                <Flex key={index} align="center" justify="space-between" p={3} bg="#F8FAFC" borderRadius="md">
                  <Box>
                    <Text fontWeight="600" color="#0F172A">{item.name}</Text>
                    <Text fontSize="sm" color="#64748B">{item.address}</Text>
                  </Box>
                  <Button
                    size="sm"
                    bg="#B91C1C"
                    color="white"
                    _hover={{ bg: "#991B1B" }}
                    onClick={() => handleDeleteAddress(item.address)}
                  >
                    <LuTrash2 size={14} />
                  </Button>
                </Flex>
              ))}
              {whitelist.length === 0 && (
                <Text color="#64748B" textAlign="center">Keine Adressen in der Whitelist.</Text>
              )}
            </Stack>
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