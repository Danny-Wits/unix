import { Stack, Text, Title } from "@mantine/core";

export default function HeadTitle({ title, subtitle }) {
  return (
    <Stack align="center" gap={4}>
      <Title order={2}>{title}</Title>

      {subtitle && (
        <Text size="sm" c="dimmed" ta="center" maw={420}>
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}
