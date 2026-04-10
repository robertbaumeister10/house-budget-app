import { Flex, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex
      as="footer"
      position="fixed"
      bottom="0"
      right="0"
      zIndex="1000"
      px={4}
      pb={3}
      justify="flex-end"
    >
      <Text fontSize="xs" color="#94A3B8">
        v0.2
      </Text>
    </Flex>
  );
}

export default Footer;
