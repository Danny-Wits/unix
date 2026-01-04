import { Button, Group, Loader, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { getProfile } from "../func";
import { logout, useSupabase } from "../SupabaseProvider";

function Home() {
  const { user } = useSupabase();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user?.id),
    enabled: !!user,
  });
  if (profile?.profile_complete === false)
    return <Navigate to="/ProfileSetup" />;
  return (
    <Stack h="100vh" justify="center" align="center" p={"xl"}>
      <Group justify="center">
        <Loader type="bars"></Loader>
        <Title>Work in progress</Title>
        <Loader type="bars"></Loader>
      </Group>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  );
}

export default Home;
