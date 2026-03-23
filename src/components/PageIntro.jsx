import { Box, Heading, Stack, Text } from "@chakra-ui/react";

function PageIntro({ eyebrow, title, description }) {
  return (
    <Stack width="full" align="center">
      <Box
        width="100%"
        position="relative"
        overflow="hidden"
        bg="linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)"
        border="1px solid"
        borderColor="#E2E8F0"
        borderRadius="2xl"
        px={{ base: 4, md: 6 }}
        py={{ base: 2.5, md: 3 }}
        boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
      >
        <Box
          position="absolute"
          top="-62px"
          right="-46px"
          w={{ base: "104px", md: "132px" }}
          h={{ base: "104px", md: "132px" }}
          borderRadius="full"
          bg="rgba(37, 99, 235, 0.08)"
        />
        <Box
          position="absolute"
          top="12px"
          left="16px"
          w="40px"
          h="3px"
          borderRadius="full"
          bg="#2563EB"
        />

        <Stack position="relative" gap={1.5} pt={3}>
          {eyebrow ? (
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="#64748B"
            >
              {eyebrow}
            </Text>
          ) : null}
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            lineHeight="1"
            letterSpacing="-0.04em"
            color="#0F172A"
            maxW="16ch"
          >
            {title}
          </Heading>
          {description ? (
            <Text maxW="760px" fontSize={{ base: "sm", md: "md" }} color="#64748B">
              {description}
            </Text>
          ) : null}
        </Stack>
      </Box>
    </Stack>
  );
}

export default PageIntro;