import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import { useState } from "react";
import { LuPlus, LuTrash2, LuUserRound, LuWallet, LuTrendingUp, LuTrendingDown, LuPersonStanding } from "react-icons/lu";

const initialMembers = [
  { id: 1, name: "Anna", address: "0xABc...1234", balance: "1.5 ETH", schulden: "0.2 ETH" },
  { id: 2, name: "Max", address: "0xDef...5678", balance: "0.8 ETH", schulden: "0.0 ETH" },
  { id: 3, name: "Lena", address: "0x123...9abc", balance: "2.1 ETH", schulden: "0.5 ETH" },
  { id: 4, name: "Tom", address: "0x456...def0", balance: "0.3 ETH", schulden: "0.1 ETH" },
];

function HouseMemberPage() {
  const [members, setMembers] = useState(initialMembers);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [newSchulden, setNewSchulden] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const addMember = () => {
    const trimmedName = newName.trim();
    const trimmedAddress = newAddress.trim();

    if (!trimmedName || !trimmedAddress) {
      setStatusMessage("Bitte mindestens Name und Adresse eingeben.");
      return;
    }

    const alreadyExists = members.some(
      (member) => member.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      setStatusMessage("Dieses Housemember existiert bereits.");
      return;
    }

    setMembers((current) => [
      ...current,
      { id: Date.now(), name: trimmedName, address: trimmedAddress, balance: newBalance || "0", schulden: newSchulden || "0" },
    ]);
    setNewName("");
    setNewAddress("");
    setNewBalance("");
    setNewSchulden("");
    setStatusMessage(`Housemember ${trimmedName} wurde hinzugefügt.`);
  };

  const removeMember = (memberToRemove) => {
    setMembers((current) => current.filter((m) => m.id !== memberToRemove.id));
    setStatusMessage(`Housemember ${memberToRemove.name} wurde entfernt.`);
  };

  return (
    <Stack gap={5} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }} pt={{ base: 1, md: 2 }}>
      <PageIntro title="Members" />

      <Stack width="full" align="center" gap={4}>

        {/* Add Card */}
        <Box
          width={{ base: "100%", lg: "70%" }}
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          p={6}
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
        >
          <Flex align="center" gap={3} mb={5}>
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
              <Text fontWeight="700" color="#0F172A" fontSize="sm">Member hinzufügen</Text>
            </Box>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3} mb={4}>
            <Stack gap={1.5}>
              <Text fontSize="xs" fontWeight="600" color="#475569">Name</Text>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="z.B. Anna"
                bg="#F8FAFC"
                borderColor="#E2E8F0"
                _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA", bg: "white" }}
              />
            </Stack>
            <Stack gap={1.5}>
              <Text fontSize="xs" fontWeight="600" color="#475569">Wallet-Adresse</Text>
              <Input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="0x..."
                bg="#F8FAFC"
                borderColor="#E2E8F0"
                _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA", bg: "white" }}
              />
            </Stack>
            <Stack gap={1.5}>
              <Text fontSize="xs" fontWeight="600" color="#475569">Balance</Text>
              <Input
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="z.B. 1.5 ETH"
                bg="#F8FAFC"
                borderColor="#E2E8F0"
                _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA", bg: "white" }}
              />
            </Stack>
            <Stack gap={1.5}>
              <Text fontSize="xs" fontWeight="600" color="#475569">Schulden</Text>
              <Input
                value={newSchulden}
                onChange={(e) => setNewSchulden(e.target.value)}
                placeholder="z.B. 0.2 ETH"
                bg="#F8FAFC"
                borderColor="#E2E8F0"
                _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA", bg: "white" }}
              />
            </Stack>
          </Grid>

          <Button
            bg="#2563EB"
            color="white"
            fontWeight="600"
            width="full"
            _hover={{ bg: "#1D4ED8" }}
            onClick={addMember}
          >
            <LuPlus />
            Member hinzufügen
          </Button>
        </Box>

        {/* Member List Card */}
        <Box
          width={{ base: "100%", lg: "70%" }}
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          p={6}
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
        >
          <Flex align="center" gap={3} mb={5}>
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
              <LuPersonStanding size={18} />
            </Flex>
            <Box>
              <Text fontWeight="700" color="#0F172A" fontSize="sm">Aktive Members</Text>
              <Text fontSize="xs" color="#94A3B8">{members.length} member</Text>
            </Box>
          </Flex>

          <Stack gap={3}>
            {members.map((member) => (
              <Box
                key={member.id}
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
                      bg="#EFF6FF"
                      color="#1D4ED8"
                      flexShrink={0}
                    >
                      <LuUserRound size={17} />
                    </Flex>

                    <Stack gap={0} flex="1" minW={0}>
                      <Flex align="center" gap={2}>
                        <Text fontWeight="700" color="#0F172A" fontSize="sm">{member.name}</Text>
                        <Text fontSize="xs" color="#16A34A" fontWeight="600">● Aktiv</Text>
                      </Flex>
                      <HStack gap={3} flexWrap="wrap">
                        <HStack gap={1}>
                          <LuWallet size={11} color="#94A3B8" />
                          <Text fontSize="xs" color="#94A3B8">{member.address}</Text>
                        </HStack>
                        <HStack gap={1}>
                          <LuTrendingUp size={11} color="#16A34A" />
                          <Text fontSize="xs" color="#16A34A">{member.balance}</Text>
                        </HStack>
                        <HStack gap={1}>
                          <LuTrendingDown size={11} color="#B91C1C" />
                          <Text fontSize="xs" color="#B91C1C">{member.schulden}</Text>
                        </HStack>
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
                    onClick={() => removeMember(member)}
                    flexShrink={0}
                  >
                    <LuTrash2 />
                  </Button>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Status */}
        <Box
          width={{ base: "100%", lg: "70%" }}
          bg="#F8FAFC"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="xl"
          px={4}
          py={3}
        >
          <Text color="#475569">{statusMessage || ""}</Text>
        </Box>
      </Stack>
    </Stack>
  );
}

export default HouseMemberPage;