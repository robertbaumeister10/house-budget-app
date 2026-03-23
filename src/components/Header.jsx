import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { LuHouse, LuLogIn } from "react-icons/lu";

function Header({ activePage, onNavigate }) {
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
        <Button
          bg="white"
          color="#1E40AF"
          size="sm"
          fontWeight="600"
          borderRadius="full"
          px={5}
          _hover={{ bg: "#EFF6FF" }}
          _focus={{ outline: "none", boxShadow: "none" }}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
        >
          <LuLogIn />
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
