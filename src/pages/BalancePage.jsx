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
import { useEffect } from "react";
import { getFinancialOverview, getTransactionHistory } from "../../ethereum/ethereumBalance";

const houseSummary = [
  {
    title: "House Balance",
    currency: "ETH",
    value: 842.5,
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    icon: LuCoins,
    type: "balance",
  },
  {
    title: "Offene Schulden",
    currency: "ETH",
    value: 192.3,
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    icon: LuCircleAlert,
    type: "debt",
  },
  {
    title: "House Balance",
    currency: "EURC",
    value: 842.5,
    accent: "#2563EB",
    accentLight: "#DBEAFE",
    icon: LuBanknote,
    type: "balance",
  },
  {
    title: "Offene Schulden",
    currency: "EURC",
    value: 192.3,
    accent: "#2563EB",
    accentLight: "#DBEAFE",
    icon: LuCircleAlert,
    type: "debt",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

const memberBalances = [
  {
    name: "Anna",
    address: "0x8ba1f109551bd432803012645ac136ddd64dba72",
    eth: 126.5,
    eurc: 85.3,
  },
  {
    name: "Max",
    address: "0xa0ee7a142d267c1f36714e4a8f75612f20a79720",
    eth: -74.2,
    eurc: -45.1,
  },
  {
    name: "Lena",
    address: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    eth: 18.9,
    eurc: 32.8,
  },
  {
    name: "Tom",
    address: "0x123456789abcdef123456789abcdef123456789",
    eth: -71.2,
    eurc: -73.0,
  },
];

const transactions = [
  {
    id: 1,
    timestamp: "2026-04-05 14:32",
    from: "Anna",
    amount: 50.5,
    to: "Max",
    currency: "ETH",
  },
  {
    id: 2,
    timestamp: "2026-04-05 13:15",
    from: "Tom",
    amount: 100.0,
    to: "Contract",
    currency: "EURC",
  },
  {
    id: 3,
    timestamp: "2026-04-05 12:45",
    from: "Lena",
    amount: 25.3,
    to: "Anna",
    currency: "ETH",
  },
  {
    id: 4,
    timestamp: "2026-04-05 11:20",
    from: "Max",
    amount: 75.8,
    to: "Contract",
    currency: "EURC",
  },
  {
    id: 5,
    timestamp: "2026-04-05 10:05",
    from: "Anna",
    amount: 45.2,
    to: "Tom",
    currency: "ETH",
  },
];

function BalancePage() {
  useEffect(() => {
    const loadFinanceOverview = async () => {
      try {
        await getFinancialOverview();
      } catch(error) {
        console.log("Could not get House Debts EURC:", error);
      }

      try {
        await getTransactionHistory();
      } catch(error) {
        console.log("Could not get House Debts EURC:", error);
      }
    };
    
    loadFinanceOverview();
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