import { HoverCard, Button, Text, Stack } from "@mantine/core";

export default function WidgetHoverButton() {
  return (
    <HoverCard width={220} shadow="md" openDelay={200} closeDelay={100}>
      <HoverCard.Target>
        <Button>Webcam</Button>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <Stack gap="xs">
          <Text fw={600}>Webcam Widget</Text>
          <Text size="sm" c="dimmed">
            Displays a live camera feed from a selected source.
          </Text>
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}