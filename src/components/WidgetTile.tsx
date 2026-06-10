import { Card, Text, Stack, Flex } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function WidgetTile({
  title,
  description,
  icon,
  onClick,
}: Props) {
  return (
    <Card
      padding="md"
      radius="md"
      withBorder
      onClick={onClick}
      styles={(theme) => ({
        root: {
          transition:
            "transform 150ms ease, background-color 150ms ease",

          "&:hover": {
            backgroundColor: theme.colors.dark[6],
            transform: "translateY(-3px)",
            cursor: "pointer",
          },
        },
      })}
    >
        <Stack gap={6}>
        <Flex justify={"center"}  gap={"lg"}>
            {icon}
            <Text fw={600}>{title}</Text>
        </Flex>
        {description && (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        )}
      </Stack>
    </Card>
  );
}