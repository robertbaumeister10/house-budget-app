import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { addWhitelistAddresses, deleteWhitelistAddresses, getWhitelist } from "../../ethereum/ethereumWhitelist";
import PageIntro from "../components/PageIntro";
import { useState, useEffect } from "react";
import { LuPlus, LuTrash2, LuClipboardList, LuWallet, LuUserRound } from "react-icons/lu";

function WhitelistPage() {
  const [addressToAdd, setAddressToAdd] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [whitelist, setWhitelist] = useState([]);

  useEffect(() => {
    const loadWhitelist = async () => {
      try {
        const whitelist = await getWhitelist();
        console.log("Whitelist: ", whitelist);
        const [addresses, names] = whitelist;
        const combined = addresses.map((addr, i) => ({
        address: addr,
        name: names[i]
      }));

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
      setAddressToAdd("");
      //const data = await getWhitelist();
      //setWhitelist(data);
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
      //const data = await getWhitelist();
      //setWhitelist(data);
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
          {/* Whitelist List */}
          <Box p={6}>
            <Flex align="center" gap={3} mb={5}>
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
                <Text fontWeight="700" color="#0F172A" fontSize="sm">Whitelist</Text>
                <Text fontSize="xs" color="#94A3B8">{whitelist.length} Adresse{whitelist.length !== 1 ? "n" : ""}</Text>
              </Box>
            </Flex>

            <Stack gap={3}>
              {whitelist.map((item, index) => (
                <Box
                  key={index}
                  border="1px solid"
                  borderColor="#E2E8F0"
                  borderRadius="xl"
                  px={4}
                  py={3}
                >
                  <Flex justify="space-between" align="center" gap={3}>
                    <HStack gap={3} flex="1" minW={0}>
                      <Flex
                        w="38px"
                        h="38px"
                        borderRadius="full"
                        align="center"
                        justify="center"
                        bg="#F0FDF4"
                        color="#166534"
                        flexShrink={0}
                      >
                        <LuUserRound size={17} />
                      </Flex>

                      <Stack gap={0} flex="1" minW={0}>
                        <Text fontWeight="700" color="#0F172A" fontSize="sm">{item.name}</Text>
                        <HStack gap={1}>
                          <LuWallet size={11} color="#94A3B8" />
                          <Text fontSize="xs" color="#94A3B8">{item.address}</Text>
                        </HStack>
                      </Stack>
                    </HStack>

                    <Button
                      variant="outline"
                      color="#B91C1C"
                      borderColor="#FECACA"
                      bg="#FEF2F2"
                      size="sm"
                      _hover={{ bg: "#FEE2E2", borderColor: "#FCA5A5" }}
                      onClick={() => handleDeleteAddress(item.address)}
                      flexShrink={0}
                    >
                      <LuTrash2 />
                    </Button>
                  </Flex>
                </Box>
              ))}
              {whitelist.length === 0 && (
                <Text color="#64748B" textAlign="center">Keine Adressen in der Whitelist.</Text>
              )}
            </Stack>
          </Box>
        </Box>

        {/* Add Section */}
        <Box
          width={{ base: "100%", lg: "70%" }}
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
        >          
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
                  <Text fontWeight="700" color="#0F172A" fontSize="sm">Member whitelisten</Text>
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