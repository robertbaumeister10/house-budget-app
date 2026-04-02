import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Tabs,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import { LuArrowRight, LuWallet } from "react-icons/lu";
import { useState } from "react";
import { ethers } from "ethers";
import {
  approveEURCTransfer,
  sendEURCtoContract,
  sendETHtoContract,
  payEURCtoAddress,
  payETHtoAddress,
} from "../../ethereum/ethereumPayment";

function PaymentPage() {
  const [paymentAddress, setPaymentAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [currency, setCurrency] = useState("ETH");
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const callApproveEURCTransfer = async (address) => {
      try{
        await approveEURCTransfer(address);
        setStatusMessage("Approve EURC Transfer.");
      }
  
      catch(error){
        setStatusMessage(error.message || "EURC Transfer not approved.");
      }
  };

  const callSendEURCtoContract = async (address) => {
      try{
        await sendEURCtoContract(address);
        setStatusMessage("Send EURC {amount} to contract.");
      }
  
      catch(error){
        setStatusMessage(error.message || "EURC not send to contract.");
      }
  };

  const callSendETHtoContract = async (address) => {
      try{
        await sendETHtoContract(address);
        setStatusMessage("Send EURC {amount} to contract.");
      }
  
      catch(error){
        setStatusMessage(error.message || "EURC not send to contract.");
      }
  };

  const callPayEURCtoAddress = async (address, amount) => {
      try{
        await payEURCtoAddress(address, amount);
        setStatusMessage("Send EURC to address.");
      }
  
      catch(error){
        setStatusMessage(error.message || "EURC could not be send to address.");
      }
  };

  const callPayETHtoAddress = async (address, amount) => {
      try{
        await payETHtoAddress(address, amount);
        setStatusMessage("Send ETH to address.");
      }
  
      catch(error){
        setStatusMessage(error.message || "ETH could not be send to address.");
      }
  };

  const handlePayment = async () => {
    if (!paymentAddress || !paymentAmount || Number(paymentAmount) <= 0) {
      setStatusMessage("Bitte Empfängeradresse und Betrag eingeben.");
      return;
    }

    const amount = currency === "ETH"
      ? ethers.parseEther(paymentAmount.toString())
      : ethers.parseUnits(paymentAmount.toString(), 18);

    try {
      if (currency === "EURC") {
        await callApproveEURCTransfer(amount);
        await callPayEURCtoAddress(paymentAddress, amount);
      } else {
        await callPayETHtoAddress(paymentAddress, amount);
      }
      setStatusMessage(`Zahlung erfolgreich (${paymentAmount} ${currency}).`);
    } catch (error) {
      setStatusMessage(error.message || "Zahlung fehlgeschlagen.");
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || Number(depositAmount) <= 0) {
      setStatusMessage("Bitte einen Betrag zum Einzahlen eingeben.");
      return;
    }

    if (currency === "EURC" && !isApproved) {
      setStatusMessage("Bitte approve für EURC bestätigen.");
      return;
    }

    const amount = currency === "ETH"
      ? ethers.parseEther(depositAmount.toString())
      : ethers.parseUnits(depositAmount.toString(), 18);

    try {
      if (currency === "EURC") {
        await callSendEURCtoContract(amount);
      } else {
        await callSendETHtoContract(amount);
      }
      setStatusMessage(`Einzahlung erfolgreich (${depositAmount} ${currency}).`);
      setDepositAmount("");
      setIsApproved(false);
    } catch (error) {
      setStatusMessage(error.message || "Einzahlung fehlgeschlagen.");
    }
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
                    onClick={() => { setCurrency("ETH"); setIsApproved(false); }}
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
                  onClick={() => { setCurrency("ETH"); setIsApproved(false); }}
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
            {currency === "EURC" && (
            <Checkbox.Root
              checked={isApproved}
              onCheckedChange={(details) => setIsApproved(details.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Approve Transaktion</Checkbox.Label>
            </Checkbox.Root>
            )}
            <Button
              bg="#0F766E"
              color="white"
              fontWeight="600"
              _hover={{ bg: "#115E59" }}
              disabled={currency === "EURC" ? !isApproved : false}
              opacity={currency === "EURC" && !isApproved ? 0.5 : 1}
              cursor={currency === "EURC" && !isApproved ? "not-allowed" : "pointer"}
              onClick={handleDeposit}
            >
              Einzahlen
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