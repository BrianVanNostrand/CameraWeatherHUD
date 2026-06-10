import { Button, Card, Text, Title } from "@mantine/core";

export default function CustomButton() {
  return (
    <Card shadow="sm" padding="lg" radius="md">
      <Title order={2}>Mantine + TypeScript</Title>

      <Text mt="md">
        This is a typed React component using Mantine.
      </Text>

      <Button mt="lg">
        Click Me
      </Button>
    </Card>
  );
}