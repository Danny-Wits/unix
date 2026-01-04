import {
  Avatar,
  Button,
  Center,
  FileButton,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { genders, interests } from "../const";
import {
  getProfile,
  getProfilePicPath,
  setProfile,
  uploadProfilePic,
} from "../func";
import { useHover, useViewportSize } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CiEdit } from "react-icons/ci";
import { useForm } from "@mantine/form";
import { useSupabase } from "../SupabaseProvider";

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
      interests: profile?.interests || [],
    },
    validate: {
      full_name: (value) => (value ? null : "Full name is required"),
      age: (value) => (value ? null : "Age is required"),
      gender: (value) => (value ? null : "Gender is required"),
      bio: (value) => (value ? null : "Bio is required"),
      interests: (value) =>
        value.length > 0 ? null : "Interests are required",
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
  });
  const { hovered, ref } = useHover();
  const { width } = useViewportSize();
  const isMobile = width < 700;

  return (
    <Stack align="center">
      <Title>Profile Setup</Title>
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
                radius="lg"
                color="initials"
                name={user?.email.split("@")[0]}
                {...props}
              >
                {hovered && <CiEdit size={24} />}
              </Avatar>
              {(hovered || isMobile) && (
                <>
                  <Text size=" xs">Click to Change Profile Pic</Text>
                </>
              )}
            </>
          )}
        </FileButton>
      </Stack>
      <Center w={"80%"}>
        <form
          onSubmit={profileSetupForm.onSubmit(submitMutation)}
          className="form"
        >
          <Stack>
            <TextInput
              label="Full Name"
              placeholder="Write your full name"
              maxLength={50}
              required
              {...profileSetupForm.getInputProps("full_name")}
            />
            <NumberInput
              label="Age"
              placeholder="18"
              required
              min={18}
              max={120}
              {...profileSetupForm.getInputProps("age")}
            />
            <Select
              label="Gender"
              placeholder="Select Gender"
              required
              data={genders}
              {...profileSetupForm.getInputProps("gender")}
            />
            <Textarea
              label="Bio"
              maxLength={200}
              placeholder="Write something about yourself"
              required
              {...profileSetupForm.getInputProps("bio")}
            />
            <MultiSelect
              label="Interests"
              placeholder="Select Interests"
              required
              data={interests}
              {...profileSetupForm.getInputProps("interests")}
            />
            <Button fullWidth loading={isPending} type="submit">
              Upload
            </Button>
          </Stack>
        </form>
      </Center>
    </Stack>
  );
}

export default ProfileSetup;
