import { Heading, List, Stack, Text } from "@chakra-ui/react";

function WhitelistPage() {
  return (
    <Stack gap={4} p={6} align="start">
      <Heading size="xl">Whitelist</Heading>
      <Text color="gray.700" textAlign="left">
        Diese Seite ist fuer Whitelist-Funktionen und zugehoerige Informationen gedacht.
      </Text>
      <List.Root textAlign="left" gap={2} color="gray.700">
        <List.Item>PaymentPage zeigt den Hauptinhalt fuer Aktionen an.</List.Item>
        <List.Item>WhitelistPage ist die getrennte Seite fuer Whitelist-Themen.</List.Item>
        <List.Item>Header enthaelt nur die Navigation.</List.Item>
        <List.Item>App steuert, welche Seite angezeigt wird.</List.Item>
      </List.Root>
    </Stack>
  );
}

export default WhitelistPage;