import { Group, Image, Title } from "@mantine/core";
import { FaHeart } from "react-icons/fa6";

function Header() {
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
    </Group>
  );
}

export default Header;
