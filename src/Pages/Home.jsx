import {
  Badge,
  Button,
  Card,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router";
import { paths } from "../const";
import { getProfile, getTraits, profileCompletion } from "../func";
import { useSupabase } from "../SupabaseProvider";

function Home() {
  const { user } = useSupabase();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user?.id),
    enabled: !!user,
  });
  const { data: _ } = useQuery({
    queryKey: ["traits"],
    queryFn: () => getTraits(user?.id),
    enabled: !!user?.id,
  });
  const navigate = useNavigate();
  const profilePercentage = profileCompletion(profile);
  if (profile?.profile_complete === false)
    return <Navigate to="/ProfileSetup" />;
  return (
    <Stack gap="xl" px="md" py="md">
      {/* Profile Overview */}
      <Card withBorder radius="md" p="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Group gap="xs">
              <Title order={3} c="#">
                Your Profile
              </Title>
              <Badge
                color={profilePercentage < 100 ? "red" : "green"}
                variant="light"
              >
                {profilePercentage < 100 ? "Incomplete" : "Complete"}
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Completing your profile improves match accuracy.
            </Text>
          </Stack>

          <Button
            color={profilePercentage < 100 ? "red" : "green"}
            variant="light"
            onClick={() => navigate(paths.profile.path)}
          >
            Edit Profile
          </Button>
        </Group>

        <Progress
          value={profilePercentage}
          mt="md"
          color={profilePercentage < 100 ? "red" : "green"}
        />
        <Text size="xs" c="dimmed" mt={4}>
          {profilePercentage}% complete
        </Text>
      </Card>

      {/* Primary Actions */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <ActionCard
          title="Personality Traits"
          description="Define how you think, communicate, and interact."
          action="Update Traits"
          onClick={() => navigate(paths.traits.path)}
        />

        <ActionCard
          title="Looking For"
          description="Clarify expectations and intent."
          action="Set Preferences"
          onClick={() => notifications.show({ message: "Feature coming soon" })}
        />
      </SimpleGrid>

      {/* Activity Snapshot */}
      <Card withBorder radius="md" p="lg">
        <Title order={4} mb="sm">
          Activity Snapshot
        </Title>

        <SimpleGrid cols={3} spacing="md">
          <Stat label="Profile Views" value="0" />
          <Stat label="Potential Matches" value="0" />
          <Stat label="Interactions" value="0" />
        </SimpleGrid>

        <Text size="xs" c="dimmed" mt="sm">
          Activity will appear once matching is enabled.
        </Text>
      </Card>

      {/* System Guidance */}
      <Card withBorder radius="md" p="lg">
        <Title order={5}>How matching works</Title>
        <Text size="sm" c="dimmed" mt={4}>
          uniX prioritizes personality alignment, intent clarity, and shared
          interests. Profiles with completed traits and preferences are ranked
          higher and shown more often.
        </Text>
      </Card>
    </Stack>
  );
}

export default Home;

/* ---------- Sub Components ---------- */

function ActionCard({ title, description, action, accent, ...props }) {
  return (
    <Card
      withBorder
      radius="md"
      p="lg"
      style={accent ? { borderLeft: "4px solid #f21616" } : undefined}
      {...props}
    >
      <Stack gap="sm">
        <Title order={4} c="#d8070b">
          {title}
        </Title>

        <Text size="sm" c="dimmed">
          {description}
        </Text>

        <Button color="red" fullWidth>
          {action}
        </Button>
      </Stack>
    </Card>
  );
}

function Stat({ label, value }) {
  return (
    <Stack gap={0} align="center">
      <Title order={3}>{value}</Title>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
    </Stack>
  );
}
