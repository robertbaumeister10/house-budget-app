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
  LuArrowLeftRight,
  LuBanknote,
  LuCircleAlert,
  LuHouse,
  LuUser,
} from "react-icons/lu";

const houseSummary = [
  {
    title: "House Balance",
    value: 842.5,
    accent: "#2563EB",
    icon: LuHouse,
  },
  {
    title: "Offene Schulden",
    value: 192.3,
    accent: "#DC2626",
    icon: LuCircleAlert,
  },
  {
    title: "Ausgleich diese Woche",
    value: 310.0,
    accent: "#059669",
    icon: LuArrowLeftRight,
  },
];

const memberBalances = [
  { name: "Anna", balance: 126.2, share: 82 },
  { name: "Max", balance: -74.8, share: 61 },
  { name: "Lena", balance: 18.6, share: 34 },
  { name: "Tom", balance: -70.0, share: 57 },
];

const memberDebts = [
  { from: "Max", to: "Anna", amount: 52.4, due: "Heute" },
  { from: "Tom", to: "Anna", amount: 37.2, due: "Morgen" },
  { from: "Tom", to: "Lena", amount: 14.6, due: "In 3 Tagen" },
  { from: "Max", to: "House Pool", amount: 88.1, due: "Offen" },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

const getBalanceStatus = (balance) => {
  if (balance > 0) {
    return {
      label: "bekommt",
      color: "#166534",
      bg: "#DCFCE7",
      border: "#BBF7D0",
    };
  }

  if (balance < 0) {
    return {
      label: "schuldet",
      color: "#991B1B",
      bg: "#FEE2E2",
      border: "#FECACA",
    };
  }

  return {
    label: "ausgeglichen",
    color: "#475569",
    bg: "#E2E8F0",
    border: "#CBD5E1",
  };
};

function BalancePage() {
  return (
    <Stack gap={8} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }} pt={{ base: 1, md: 2 }}>
      <PageIntro
        title="Finance Overview"      />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
        {houseSummary.map((item) => {
          const Icon = item.icon;

          return (
            <Box
              key={item.title}
              bg="white"
              border="1px solid"
              borderColor="#E2E8F0"
              borderRadius="2xl"
              p={5}
              boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
            >
              <Flex align="flex-start" justify="space-between" gap={4}>
                <Stack gap={2}>
                  <Text fontSize="sm" color="#64748B" fontWeight="600">
                    {item.title}
                  </Text>
                  <Text
                    fontSize="3xl"
                    fontWeight="800"
                    color="#0F172A"
                    fontVariantNumeric="tabular-nums"
                  >
                    {formatCurrency(item.value)}
                  </Text>
                  <Text fontSize="sm" color="#475569">
                    {item.description}
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

      <Grid templateColumns={{ base: "1fr", xl: "1.3fr 0.9fr" }} gap={5}>
        <Box
          bg="white"
          border="1px solid"
          borderColor="#E2E8F0"
          borderRadius="2xl"
          p={5}
          boxShadow="0 18px 40px rgba(15, 23, 42, 0.05)"
        >
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={3}
            mb={5}
          >
            <Stack gap={1}>
              <Heading size="md" color="#0F172A">
                Balance pro Mitglied
              </Heading>
              <Text color="#64748B">
              </Text>
            </Stack>

            <Button
              size="sm"
              bg="#EFF6FF"
              color="#1D4ED8"
              border="1px solid"
              borderColor="#BFDBFE"
              _hover={{ bg: "#DBEAFE" }}
            >
              Alle Details
            </Button>
          </Flex>

          <Stack gap={3}>
            {memberBalances.map((member) => {
              const status = getBalanceStatus(member.balance);

              return (
                <Box
                  key={member.name}
                  border="1px solid"
                  borderColor="#E2E8F0"
                  borderRadius="xl"
                  px={4}
                  py={4}
                >
                  <Flex
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    direction={{ base: "column", md: "row" }}
                    gap={3}
                  >
                    <HStack gap={3} align="center">
                      <Flex
                        w="42px"
                        h="42px"
                        borderRadius="full"
                        align="center"
                        justify="center"
                        bg="#EFF6FF"
                        color="#1D4ED8"
                      >
                        <LuUser size={18} />
                      </Flex>

                      <Stack gap={1}>
                        <Text fontWeight="700" color="#0F172A">
                          {member.name}
                        </Text>
                        <Badge
                          width="fit-content"
                          px={2.5}
                          py={1}
                          borderRadius="full"
                          border="1px solid"
                          borderColor={status.border}
                          bg={status.bg}
                          color={status.color}
                          textTransform="none"
                        >
                          {status.label}
                        </Badge>
                      </Stack>
                    </HStack>

                    <Stack gap={1} minW={{ md: "220px" }}>
                      <Text
                        textAlign={{ base: "left", md: "right" }}
                        fontWeight="800"
                        fontSize="xl"
                        color={member.balance >= 0 ? "#166534" : "#B91C1C"}
                        fontVariantNumeric="tabular-nums"
                      >
                        {formatCurrency(member.balance)}
                      </Text>
                      <Box
                        h="8px"
                        borderRadius="full"
                        bg="#E2E8F0"
                        overflow="hidden"
                      >
                        <Box
                          h="full"
                          borderRadius="full"
                          bg={member.balance >= 0 ? "#22C55E" : "#EF4444"}
                          width={`${member.share}%`}
                        />
                      </Box>
                    </Stack>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Stack gap={5}>
          <Box
            bg="linear-gradient(135deg, #1D4ED8 0%, #0F172A 100%)"
            color="white"
            borderRadius="2xl"
            p={5}
            boxShadow="0 18px 40px rgba(37, 99, 235, 0.20)"
          >
            <HStack justify="space-between" align="flex-start" mb={5}>
              <Stack gap={1}>
                <Text color="rgba(255,255,255,0.75)" fontWeight="600">
                  Naechster Ausgleich
                </Text>
              </Stack>
              <Flex
                w="44px"
                h="44px"
                borderRadius="full"
                bg="rgba(255,255,255,0.16)"
                align="center"
                justify="center"
              >
                <LuBanknote size={20} />
              </Flex>
            </HStack>

            <Text
              fontSize="4xl"
              fontWeight="800"
              fontVariantNumeric="tabular-nums"
              lineHeight="1"
              mb={3}
            >
              {formatCurrency(52.4)}
            </Text>
          </Box>

          <Box
            bg="white"
            border="1px solid"
            borderColor="#E2E8F0"
            borderRadius="2xl"
            p={5}
            boxShadow="0 18px 40px rgba(15, 23, 42, 0.05)"
          >
            <Stack gap={1} mb={5}>
              <Heading size="md" color="#0F172A">
                Offene Schulden
              </Heading>
              <Text color="#64748B">
              </Text>
            </Stack>

            <Stack gap={3}>
              {memberDebts.map((debt) => (
                <Box
                  key={`${debt.from}-${debt.to}-${debt.amount}`}
                  border="1px solid"
                  borderColor="#E2E8F0"
                  borderRadius="xl"
                  p={4}
                >
                  <Flex justify="space-between" align="flex-start" gap={3}>
                    <Stack gap={1}>
                      <Text fontWeight="700" color="#0F172A">
                        {debt.from} schuldet {debt.to}
                      </Text>
                      <Text color="#64748B" fontSize="sm">
                        Faellig: {debt.due}
                      </Text>
                    </Stack>

                    <Stack gap={2} align="flex-end">
                      <Text
                        fontWeight="800"
                        color="#B91C1C"
                        fontVariantNumeric="tabular-nums"
                      >
                        {formatCurrency(debt.amount)}
                      </Text>
                      <Badge
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        bg="#FEF3C7"
                        color="#92400E"
                        border="1px solid"
                        borderColor="#FDE68A"
                        textTransform="none"
                      >
                        offen
                      </Badge>
                    </Stack>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Stack>
  );
}

export default BalancePage;