import {
  Button,
  Center,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useSafeMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Notifications } from "@mantine/notifications";
import { CiHeart } from "react-icons/ci";
import {
  FaEye,
  FaHandHoldingHeart,
  FaHeart,
  FaHeartCirclePlus,
} from "react-icons/fa6";
import { LuEyeClosed } from "react-icons/lu";
import { Navigate } from "react-router";
import { login, useSupabase } from "../SupabaseProvider";
function Auth() {
  const theme = useSafeMantineTheme();
  const { user } = useSupabase();
  if (user) return <Navigate to="/Home" />;
  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password should be at least 8 characters" : null,
    },
  });
  const VisibilityToggleIcon = ({ reveal }) =>
    reveal ? (
      <FaEye
        color="#d8070b"
        style={{
          width: "var(--psi-icon-size)",
          height: "var(--psi-icon-size)",
        }}
      />
    ) : (
      <LuEyeClosed
        style={{
          width: "var(--psi-icon-size)",
          height: "var(--psi-icon-size)",
        }}
      />
    );
  return (
    <Group h="100vh" justify="center" className="authBackground">
      <Center
        h="70vh"
        w={{ base: "100%", sm: "70%" }}
        m={{ base: "0", md: "xl" }}
      >
        <Stack
          visibleFrom="md"
          flex={1}
          bg={theme.primaryColor}
          h={"100%"}
          bdrs={"10px 0 0 10px"}
          p={"lg"}
          justify="center"
          gap={0}
        >
          <Image
            className="hide-on-hover"
            src="./public/loginL.png"
            fit="contain"
            h={"80%"}
          />
          <Title order={2} c={"white"}>
            Made for Your Campus
          </Title>
          <Text c={"white"}>
            Connect with seniors, juniors, and new faces across campus.
          </Text>
          <Text fs={"italic"} ta={"right"}>
            Catch. Match. Connect.
          </Text>
        </Stack>
        <Stack flex={0.8} h={"100%"}>
          <Paper
            h={"100%"}
            p="lg"
            shadow="md"
            withBorder
            bdrs={"0 10px 10px 0"}
          >
            <Stack justify="center" h="100%">
              <Image src="./public/logo.svg" mah={"140px"} fit="cover"></Image>
              <Group gap={10} mb={"md"} align="center">
                <Title order={2}>Welcome</Title>
                <Group gap={0}>
                  <CiHeart size={30} className="pulse-on-hover" />
                  <CiHeart size={30} className="pulse-on-hover" />
                  <FaHeart size={30} className="pulse" color="#d8070b" />
                </Group>
              </Group>
              <form
                onSubmit={loginForm.onSubmit((values) =>
                  login(values.email, values.password)
                )}
              >
                <TextInput
                  mb={"sm"}
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  key={loginForm.key("email")}
                  {...loginForm.getInputProps("email")}
                />

                <PasswordInput
                  withAsterisk
                  label="Password"
                  placeholder="your password"
                  key={loginForm.key("password")}
                  visibilityToggleIcon={VisibilityToggleIcon}
                  {...loginForm.getInputProps("password")}
                />
                <Stack justify="flex-end" mt="lg">
                  <Button
                    fullWidth
                    type="submit"
                    rightSection={<FaHandHoldingHeart />}
                  >
                    Log in
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    onClick={() => {
                      Notifications.show({
                        message:
                          "Sign up feature coming soon. Site is under Testing",
                        color: "white",
                        title: "Work in progress",
                        icon: <FaHeart size={20} color="red" />,
                      });
                    }}
                    rightSection={<FaHeartCirclePlus />}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </Stack>
      </Center>
    </Group>
  );
}

export default Auth;
