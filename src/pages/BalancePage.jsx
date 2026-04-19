import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import {
  LuBanknote,
  LuCircleAlert,
  LuCoins,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import { getFinancialOverview, getTransactionHistory } from "../../ethereum/ethereumBalance";
import { getAllHouseMembers } from "../../ethereum/ethereumMembers";

import { ethers } from "ethers";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

function BalancePage() {
  const [houseSummary, setHouseSummary] = useState([]);
  const [memberBalances, setMemberBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Financial Overview
      try {
        const overview = await getFinancialOverview();
        if (overview && overview.length === 4) {
          const [balanceETH, debtETH, balanceEURC, debtEURC] = overview;
          const summary = [
            {
              title: "House Balance",
              currency: "ETH",
              value: parseFloat(ethers.formatEther(balanceETH)),
              accent: "#7C3AED",
              accentLight: "#EDE9FE",
              icon: LuCoins,
              type: "balance",
            },
            {
              title: "Offene Schulden",
              currency: "ETH",
              value: parseFloat(ethers.formatEther(debtETH)),
              accent: "#7C3AED",
              accentLight: "#EDE9FE",
              icon: LuCircleAlert,
              type: "debt",
            },
            {
              title: "House Balance",
              currency: "EURC",
              value: parseFloat(ethers.formatEther(balanceEURC)),
              accent: "#2563EB",
              accentLight: "#DBEAFE",
              icon: LuBanknote,
              type: "balance",
            },
            {
              title: "Offene Schulden",
              currency: "EURC",
              value: parseFloat(ethers.formatEther(debtEURC)),
              accent: "#2563EB",
              accentLight: "#DBEAFE",
              icon: LuCircleAlert,
              type: "debt",
            },
          ];
          setHouseSummary(summary);
        }
      } catch(error) {
        console.log("Could not get financial overview:", error);
      }

      try {
        const members = await getAllHouseMembers();
        if (members) {
          const formattedMembers = members.map(member => ({
            name: member.memberName,
            address: member.memberAddress,
            eth: parseFloat(ethers.formatEther(member.memberBalance)),
            eurc: parseFloat(ethers.formatEther(member.memberEURCBalance)),
          }));
          setMemberBalances(formattedMembers);
        }
      } catch(error) {
        console.log("Could not get house members:", error);
      }

      try {
        const txHistory = await getTransactionHistory();
        if (txHistory) {
          const formattedTx = txHistory.map((tx, index) => ({
            id: index + 1,
            timestamp: tx.blockTimestamp ? new Date(tx.blockTimestamp).toLocaleString() : 'Unknown',
            from: tx.from,
            to: tx.to,
            amount: parseFloat(ethers.formatEther(tx.value || 0)),
            currency: tx.asset === 'ETH' ? 'ETH' : (tx.asset === 'EURC' ? 'EURC' : 'UNKNOWN'),
          }));
          setTransactions(formattedTx);
        }
      } catch(error) {
        console.log("Could not get transaction history:", error);
      }
    };
    
    loadData();
  }, []);
  return (
    <Stack gap={8} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }} pt={{ base: 1, md: 2 }}>
      <PageIntro
        title="Finance Overview"      />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
        {houseSummary.map((item) => {
          const Icon = item.icon;

          return (
            <Box
              key={`${item.title}-${item.currency}`}
              bg="white"
              border="1px solid"
              borderColor="#E2E8F0"
              borderRadius="2xl"
              p={5}
              boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
            >
              <Flex align="flex-start" justify="space-between" gap={4}>
                <Stack gap={2} flex={1}>
                  <Flex align="center" gap={2}>
                    <Text 
                      fontSize="sm" 
                      fontWeight="600"
                      color={item.type === "balance" ? "#16A34A" : "#DC2626"}
                    >
                      {item.title}
                    </Text>
                    <Badge
                      fontSize="xs"
                      fontWeight="700"
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      bg={item.accentLight}
                      color={item.accent}
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                    >
                      {item.currency}
                    </Badge>
                  </Flex>
                  <Text
                    fontSize="3xl"
                    fontWeight="800"
                    color="#0F172A"
                    fontVariantNumeric="tabular-nums"
                  >
                    {formatCurrency(item.value)}
                  </Text>
                </Stack>

                <Flex
                  w="48px"
                  h="48px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  bg={item.accent}
                  color="white"
                  flexShrink={0}
                >
                  <Icon size={20} />
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={5}>
        {/* Member Balances Box */}
        <Box
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          p={6}
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
        >
          <Flex align="center" gap={3} mb={5}>
            <Box>
              <Text fontWeight="700" color="#0F172A" fontSize="sm">Member Kontostände</Text>
              <Text fontSize="xs" color="#94A3B8">{memberBalances.length} Mitglieder</Text>
            </Box>
          </Flex>

          <Stack gap={3}>
            {memberBalances.map((member) => (
              <Box
                key={member.address}
                border="1px solid"
                borderColor="#E2E8F0"
                borderRadius="xl"
                px={4}
                py={3}
              >
                <Stack gap={2}>
                  <Box>
                    <Text fontWeight="700" color="#0F172A" fontSize="sm">{member.name}</Text>
                    <Text fontSize="xs" color="#94A3B8">{member.address}</Text>
                  </Box>
                  <Flex gap={4}>
                    <Box flex={1}>
                      <Text fontSize="xs" color="#64748B" fontWeight="500">ETH</Text>
                      <Text 
                        fontWeight="700" 
                        fontSize="sm" 
                        color={member.eth >= 0 ? "#16A34A" : "#DC2626"}
                      >
                        {member.eth >= 0 ? "+" : ""}{member.eth.toFixed(2)}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      <Text fontSize="xs" color="#64748B" fontWeight="500">EURC</Text>
                      <Text 
                        fontWeight="700" 
                        fontSize="sm" 
                        color={member.eurc >= 0 ? "#16A34A" : "#DC2626"}
                      >
                        {member.eurc >= 0 ? "+" : ""}{member.eurc.toFixed(2)}
                      </Text>
                    </Box>
                  </Flex>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Transactions Box */}
        <Box
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          p={6}
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
        >
          <Flex align="center" gap={3} mb={5}>
            <Box>
              <Text fontWeight="700" color="#0F172A" fontSize="sm">Transaktionen</Text>
              <Text fontSize="xs" color="#94A3B8">{transactions.length} Transaktionen</Text>
            </Box>
          </Flex>

          <Stack gap={2}>
            {transactions.map((tx) => (
              <Box
                key={tx.id}
                border="1px solid"
                borderColor="#E2E8F0"
                borderRadius="xl"
                px={4}
                py={3}
              >
                <Flex justify="space-between" align="flex-start" gap={3}>
                  <Stack gap={1} flex={1} minW={0}>
                    <Flex align="center" gap={2}>
                      <Text fontSize="xs" color="#94A3B8" fontWeight="500">{tx.timestamp}</Text>
                      <Badge
                        fontSize="xs"
                        fontWeight="700"
                        px={1.5}
                        py={0.5}
                        borderRadius="md"
                        bg={tx.currency === "ETH" ? "#EDE9FE" : "#DBEAFE"}
                        color={tx.currency === "ETH" ? "#7C3AED" : "#2563EB"}
                        textTransform="uppercase"
                      >
                        {tx.currency}
                      </Badge>
                    </Flex>
                    <Text fontSize="xs" color="#0F172A" fontWeight="600">
                      {tx.from} → {tx.to}
                    </Text>
                  </Stack>
                  <Text 
                    fontWeight="700" 
                    fontSize="sm" 
                    color="#0F172A"
                    whiteSpace="nowrap"
                  >
                    {tx.amount.toFixed(2)}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
}

export default BalancePage;