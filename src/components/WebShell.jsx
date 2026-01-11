import { AppShell, Box, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import NavMob from "./NavMob";
import NavPC from "./NavPC";

export function WebShell({ children }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Header></Header>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Box hiddenFrom="sm" h={"100%"}>
          <NavMob toggle={toggleMobile}></NavMob>
        </Box>
        <Box visibleFrom="sm" h={"100%"}>
          <NavPC toggle={toggleDesktop}></NavPC>
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
