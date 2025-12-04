import {
  ActionIcon,
  Group,
  Image,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { FaHeart, FaMoon, FaSun } from "react-icons/fa6";

function Header() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Group>
      <Image
        src="login.png"
        w={50}
        height={50}
        fit="scale-down"
        bdrs={"50%"}
        display={"inline-block"}
      ></Image>
      <Title order={2}>Uni X</Title>
      <FaHeart color="red" size={28} className="pulse" />

      <ActionIcon
        variant="outline"
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        color={dark ? theme.colors.dark[1] : theme.colors.dark[7]}
      >
        {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </ActionIcon>
    </Group>
  );
}

export default Header;
