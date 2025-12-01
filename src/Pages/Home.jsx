import { Button, Group, Loader, Stack, Title } from "@mantine/core";
import { logout } from "../SupabaseProvider";

function Home() {
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
