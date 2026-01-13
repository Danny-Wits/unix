import {
  Avatar,
  Button,
  Center,
  FileButton,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useHover, useViewportSize } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { genders } from "../const";
import {
  getProfile,
  getProfilePicPath,
  setProfile,
  uploadProfilePic,
} from "../func";

import { useForm } from "@mantine/form";
import { CiEdit } from "react-icons/ci";
import {
  FiCalendar,
  FiCamera,
  FiFileText,
  FiUpload,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { useSupabase } from "../SupabaseProvider";
import HeadTitle from "../components/HeadTitle";

function ProfileSetup() {
  const { user } = useSupabase();
  const queryClient = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user?.id),
    enabled: !!user,
  });
  const profileSetupForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      full_name: profile?.full_name || "",
      age: profile?.age || 18,
      gender: profile?.gender || "male",
      bio: profile?.bio || "",
    },
    validate: {
      full_name: (value) => (value ? null : "Full name is required"),
      age: (value) => (value ? null : "Age is required"),
      gender: (value) => (value ? null : "Gender is required"),
    },
  });
  const { mutate: submitMutation, isPending } = useMutation({
    mutationKey: ["setProfile"],
    mutationFn: (values) =>
      setProfile({
        ...values,
        id: user?.id,
        profile_complete: true,
        updated_at: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["profile"] });
    },
  });
  const { data: profilePicPath } = useQuery({
    queryKey: ["profilePicPath"],
    queryFn: () => getProfilePicPath(user?.id),
    refetchOnWindowFocus: false,
  });
  const { hovered, ref } = useHover();
  const { width } = useViewportSize();
  const isMobile = width < 700;

  return (
    <Stack align="center">
      <HeadTitle title="Profile" subtitle="Edit your profile" />

      <Stack align="center">
        <FileButton
          onChange={(file) => uploadProfilePic(file, user?.id)}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <>
              <Avatar
                ref={ref}
                src={profilePicPath}
                size="200px"
                radius="50%"
                color="initials"
                bd={"2px solid"}
                name={user?.email.split("@")[0]}
                {...props}
              >
                {hovered && <CiEdit size={26} />}
              </Avatar>

              {(hovered || isMobile) && (
                <Group gap="xs" mt="xs">
                  <FiCamera size={14} />
                  <Text size="xs">Click to change profile picture</Text>
                </Group>
              )}
            </>
          )}
        </FileButton>
      </Stack>

      {/* Form */}
      <Center w="80%">
        <form
          onSubmit={profileSetupForm.onSubmit(submitMutation)}
          className="form"
        >
          <Stack>
            <TextInput
              label={<FieldLabel icon={FiUser} text="Full Name" />}
              placeholder="Write your full name"
              maxLength={50}
              {...profileSetupForm.getInputProps("full_name")}
            />

            <NumberInput
              label={<FieldLabel icon={FiCalendar} text="Age" />}
              placeholder="18"
              min={18}
              max={120}
              {...profileSetupForm.getInputProps("age")}
            />

            <Select
              label={<FieldLabel icon={FiUsers} text="Gender" />}
              placeholder="Select gender"
              data={genders}
              {...profileSetupForm.getInputProps("gender")}
            />

            <Textarea
              label={<FieldLabel icon={FiFileText} text="Bio" />}
              placeholder="Write your bio"
              maxLength={250}
              {...profileSetupForm.getInputProps("bio")}
            />

            <Button
              fullWidth
              loading={isPending}
              type="submit"
              leftSection={<FiUpload size={16} />}
            >
              Upload
            </Button>
          </Stack>
        </form>
      </Center>
    </Stack>
  );
}

export default ProfileSetup;
// eslint-disable-next-line no-unused-vars
function FieldLabel({ icon: Icon, text }) {
  return (
    <Group gap="xs">
      <Icon size={18} />
      <Text size="sm" fw={500}>
        {text}
      </Text>
    </Group>
  );
}
