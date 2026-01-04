import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useSupabase } from "../SupabaseProvider";
import { paths } from "../const";
import { getProfilePicPath } from "../func";

function NavMob({ toggle }) {
  if (!toggle) toggle = () => {};
  const { user } = useSupabase();
  const navigate = useNavigate();
  const name = user?.email.split("@")[0];
  return (
    <Stack>
      <Group align="center" p={5}>
        <Avatar src={getProfilePicPath(user?.id)} name={name} size="md" color="initials"></Avatar>
        <Text size="sm" fw={"bold"}>
          {name}
        </Text>
      </Group>
      {Object.keys(paths).map((path) =>
        createLink(paths[path], navigate, toggle)
      )}
    </Stack>
  );
}

function createLink(link, navigate, toggle) {
  return (
    <Group
      onClick={() => {
        link.callBack();
        navigate(link.path);
        toggle();
      }}
      style={{ cursor: "pointer" }}
      key={link.label}
    >
      <link.icon />
      <Text>{link.label}</Text>
    </Group>
  );
}
export default NavMob;
