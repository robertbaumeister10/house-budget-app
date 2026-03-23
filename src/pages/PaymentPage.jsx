import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import { LuArrowRight, LuWallet } from "react-icons/lu";
import { useState } from "react";

function PaymentPage() {
  const [paymentAddress, setPaymentAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [currency, setCurrency] = useState("ETH");

  const handlePayment = () => {
    if (!paymentAddress.trim() || !paymentAmount.trim()) {
      setStatusMessage("Bitte Adresse und Betrag fuer die Zahlung eingeben.");
      return;
    }

    setStatusMessage(
      `Zahlung vorbereitet: ${paymentAmount} an ${paymentAddress}. Contract-Call kann hier angeschlossen werden.`
    );
    console.log("send payment", { paymentAddress, paymentAmount });
  };

  const handleDeposit = () => {
    if (!depositAmount.trim()) {
      setStatusMessage("Bitte einen Betrag fuer die Einzahlung eingeben.");
      return;
    }

    setStatusMessage(
      `Einzahlung vorbereitet: ${depositAmount} in den House Pool. Contract-Call kann hier angeschlossen werden.`
    );
    console.log("deposit into house pool", { depositAmount });
  };

  return (
    <Stack gap={8} px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }} pt={{ base: 1, md: 2 }}>
      <PageIntro
        title="Payment"      />

      <Tabs.Root defaultValue="pay" variant="plain">
        <Stack width="full" align="center" gap={4}>
          <Stack width={{ base: "100%", lg: "70%" }} gap={3}>
            <Flex
              bg="#F8FAFC"
              border="1px solid"
              borderColor="#E2E8F0"
              borderRadius="full"
              p="1"
              gap="1"
              width="full"
              justify="center"
              align="center"
            >
              <Tabs.List gap="1" border="none" bg="transparent">
                <Tabs.Trigger
                  value="pay"
                  borderRadius="full"
                  px={4}
                  py={2.5}
                  color="#475569"
                  _selected={{ bg: "#2563EB", color: "white" }}
                >
                  <LuArrowRight />
                  Bezahlen
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="deposit"
                  borderRadius="full"
                  px={4}
                  py={2.5}
                  color="#475569"
                  _selected={{ bg: "#0F766E", color: "white" }}
                >
                  <LuWallet />
                  Einzahlen
                </Tabs.Trigger>
              </Tabs.List>
            </Flex>
          </Stack>

          <Box
            width={{ base: "100%", lg: "70%" }}
            bg="white"
            border="1px solid"
            borderColor="#E2E8F0"
            borderRadius="2xl"
            p={5}
            boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
          >
            <Tabs.Content value="pay">
            <Flex align="flex-start" justify="space-between" gap={4} mb={5}>
              <Stack gap={1}>
                <Heading size="md" color="#0F172A">
                  Bezahlen
                </Heading>
              </Stack>

              <Flex align="center" gap={3}>
                <Flex
                  bg="#F8FAFC"
                  border="1px solid"
                  borderColor="#E2E8F0"
                  borderRadius="full"
                  p="1"
                  gap="1"
                >
                  <Box
                    as="button"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="700"
                    cursor="pointer"
                    bg={currency === "ETH" ? "#7C3AED" : "transparent"}
                    color={currency === "ETH" ? "white" : "#475569"}
                    onClick={() => setCurrency("ETH")}
                    transition="all 0.15s"
                  >
                    ETH
                  </Box>
                  <Box
                    as="button"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="700"
                    cursor="pointer"
                    bg={currency === "EURC" ? "#2563EB" : "transparent"}
                    color={currency === "EURC" ? "white" : "#475569"}
                    onClick={() => setCurrency("EURC")}
                    transition="all 0.15s"
                  >
                    EURC
                  </Box>
                </Flex>
              </Flex>
            </Flex>

            <Stack gap={4}>
              <Stack gap={1.5}>
                <Text fontSize="sm" fontWeight="600" color="#334155">
                  Empfängeradresse
                </Text>
                <Input
                  value={paymentAddress}
                  onChange={(event) => setPaymentAddress(event.target.value)}
                  placeholder="0x..."
                  bg="white"
                  borderColor="#CBD5E1"
                  _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA" }}
                />
              </Stack>

              <Stack gap={1.5}>
                <Text fontSize="sm" fontWeight="600" color="#334155">
                  Betrag
                </Text>
                <Flex position="relative" align="center">
                  <Input
                    value={paymentAmount}
                    onChange={(event) => setPaymentAmount(event.target.value)}
                    placeholder="0.00"
                    type="number"
                    bg="white"
                    borderColor="#CBD5E1"
                    pr="60px"
                    _focusVisible={{ borderColor: "#60A5FA", boxShadow: "0 0 0 1px #60A5FA" }}
                  />
                  <Box
                    position="absolute"
                    right="12px"
                    fontSize="xs"
                    fontWeight="700"
                    color={currency === "ETH" ? "#7C3AED" : "#2563EB"}
                    pointerEvents="none"
                  >
                    {currency}
                  </Box>
                </Flex>
              </Stack>

              <Button
                bg="#2563EB"
                color="white"
                fontWeight="600"
                _hover={{ bg: "#1D4ED8" }}
                onClick={handlePayment}
              >
                Zahlung senden
              </Button>
            </Stack>
            </Tabs.Content>

            <Tabs.Content value="deposit">
            <Flex align="flex-start" justify="space-between" gap={4} mb={5}>
              <Stack gap={1}>
                <Heading size="md" color="#0F172A">
                  Einzahlen
                </Heading>
              </Stack>

              <Flex
                bg="#F8FAFC"
                border="1px solid"
                borderColor="#E2E8F0"
                borderRadius="full"
                p="1"
                gap="1"
              >
                <Box
                  as="button"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="700"
                  cursor="pointer"
                  bg={currency === "ETH" ? "#7C3AED" : "transparent"}
                  color={currency === "ETH" ? "white" : "#475569"}
                  onClick={() => setCurrency("ETH")}
                  transition="all 0.15s"
                >
                  ETH
                </Box>
                <Box
                  as="button"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="700"
                  cursor="pointer"
                  bg={currency === "EURC" ? "#2563EB" : "transparent"}
                  color={currency === "EURC" ? "white" : "#475569"}
                  onClick={() => setCurrency("EURC")}
                  transition="all 0.15s"
                >
                  EURC
                </Box>
              </Flex>
            </Flex>

            <Stack gap={4}>
              <Stack gap={1.5}>
                <Text fontSize="sm" fontWeight="600" color="#334155">
                  Betrag
                </Text>
                <Flex position="relative" align="center">
                  <Input
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}
                    placeholder="0.00"
                    type="number"
                    bg="white"
                    borderColor="#CBD5E1"
                    pr="60px"
                    _focusVisible={{ borderColor: "#5EEAD4", boxShadow: "0 0 0 1px #5EEAD4" }}
                  />
                  <Box
                    position="absolute"
                    right="12px"
                    fontSize="xs"
                    fontWeight="700"
                    color={currency === "ETH" ? "#7C3AED" : "#2563EB"}
                    pointerEvents="none"
                  >
                    {currency}
                  </Box>
                </Flex>
              </Stack>

              <Button
                bg="#0F766E"
                color="white"
                fontWeight="600"
                _hover={{ bg: "#115E59" }}
                onClick={handleDeposit}
              >
                In House Pool einzahlen
              </Button>
            </Stack>
            </Tabs.Content>
          </Box>
        </Stack>
      </Tabs.Root>
    </Stack>
  );
}

export default PaymentPage;