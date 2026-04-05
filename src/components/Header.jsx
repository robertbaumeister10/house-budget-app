import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuHouse, LuLogIn, LuUserCheck, LuLogOut } from "react-icons/lu";
import { ping, getETHPrice, connectWallet } from "../../ethereum/ethereum";

function Header({ activePage, onNavigate }) {
  const [isContractConnected, setIsContractConnected] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkConnection = async () => {
      try {
        await ping();
        if (isMounted) {
          setIsContractConnected(true);
        }
      } catch {
        if (isMounted) {
          setIsContractConnected(false);
        }
      }
    };

    checkConnection();
    const intervalId = setInterval(checkConnection, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  },
  []);

  useEffect(() => {
    const fetchGetETHPrice = async () => {
      try {
        console.log("try to get current ether price!");
        const response = await getETHPrice();
        const fixedPrice = response.result.ethusd.slice(0, -9); 
        setEthPrice(fixedPrice);
        console.log("ETHPrice: ", response.result.ethusd);
      } catch (error) {
        console.log("Cant get current ETH Price!");
        console.log("Error: ", error);
      }
    };

    fetchGetETHPrice();

    return () => {
    };
  },
  []);

  return (
    <Flex
      px={6}
      py={3}
      bg="#DBEAFE"
      align="center"
      borderBottom="1px solid"
      borderColor="#BFDBFE"
    >
      <HStack flex="1" gap={2} align="center">
        <Box color="#2563EB" display="flex" alignItems="center">
          <LuHouse size={22} />
        </Box>
        <Text
          fontSize="xl"
          fontFamily="'Inter', 'DM Sans', system-ui, sans-serif"
          lineHeight="1"
          userSelect="none"
        >
          <Box as="span" fontWeight="800" color="#1E3A5F">House</Box>
          <Box as="span" fontWeight="400" color="#3B82F6">Budget</Box>
        </Text>
      </HStack>

      <HStack flex="1" justify="center" gap={1}>
        <Button
          bg={activePage === "balance" ? "#2563EB" : "transparent"}
          color={activePage === "balance" ? "white" : "#1E3A5F"}
          fontWeight={activePage === "balance" ? "600" : "400"}
          border="none"
          _hover={{ bg: activePage === "balance" ? "#1D4ED8" : "#BFDBFE" }}
          _focus={{ outline: "none", boxShadow: "none" }}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
          size="sm"
          onClick={() => onNavigate("balance")}
        >
          Finance Overview
        </Button>
        <Button
          bg={activePage === "payment" ? "#2563EB" : "transparent"}
          color={activePage === "payment" ? "white" : "#1E3A5F"}
          fontWeight={activePage === "payment" ? "600" : "400"}
          border="none"
          _hover={{ bg: activePage === "payment" ? "#1D4ED8" : "#BFDBFE" }}
          _focus={{ outline: "none", boxShadow: "none" }}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
          size="sm"
          onClick={() => onNavigate("payment")}
        >
          Payment
        </Button>
        <Button
          bg={activePage === "housemember" ? "#2563EB" : "transparent"}
          color={activePage === "housemember" ? "white" : "#1E3A5F"}
          fontWeight={activePage === "housemember" ? "600" : "400"}
          border="none"
          _hover={{ bg: activePage === "housemember" ? "#1D4ED8" : "#BFDBFE" }}
          _focus={{ outline: "none", boxShadow: "none" }}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
          size="sm"
          onClick={() => onNavigate("housemember")}
        >
          Members
        </Button>
        <Button
          bg={activePage === "whitelist" ? "#2563EB" : "transparent"}
          color={activePage === "whitelist" ? "white" : "#1E3A5F"}
          fontWeight={activePage === "whitelist" ? "600" : "400"}
          border="none"
          _hover={{ bg: activePage === "whitelist" ? "#1D4ED8" : "#BFDBFE" }}
          _focus={{ outline: "none", boxShadow: "none" }}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
          size="sm"
          onClick={() => onNavigate("whitelist")}
        >
          Whitelist
        </Button>
      </HStack>

      <Flex flex="1" justify="flex-end">
        <HStack gap={3} mr={3}>
          <Text fontSize="sm" fontWeight="600" color="#3B82F6">
            ETH: {ethPrice} $
        </Text>
          <Box
            w="8px"
            h="8px"
            borderRadius="full"
            bg={isContractConnected ? "green.400" : "red.400"}
          />
          <Text fontSize="sm" color={isContractConnected ? "green.700" : "red.700"} fontWeight="600">
            {isContractConnected ? "Connected" : "Disconnected"}
          </Text>
        </HStack>
        <Button
          size="sm"
          fontWeight="600"
          borderRadius="full"
          px={5}
          _focus={{ outline: "none", boxShadow: "none" }}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
          onClick={async () => {
            if (isWalletConnected) {
              // Logout
              setIsWalletConnected(false);
              setWalletAddress(null);
              console.log("Wallet disconnected");
            } else {
              // Login
              const signer = await connectWallet();
              if (signer) {
                const address = await signer.getAddress();
                setWalletAddress(address);
                setIsWalletConnected(true);
              }
            }
          }}
          bg={isWalletConnected ? "#DC2626" : "white"}
          color={isWalletConnected ? "white" : "#1E40AF"}
          _hover={{ bg: isWalletConnected ? "#B91C1C" : "#EFF6FF" }}
        >
          {isWalletConnected ? (
            <>
              <LuLogOut />
              Logout
            </>
          ) : (
            <>
              <LuLogIn />
              Login
            </>
          )}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
