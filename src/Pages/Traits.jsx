import {
  Center,
  Chip,
  Divider,
  Group,
  NumberInput,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  FiActivity,
  FiArrowUp,
  FiCalendar,
  FiClock,
  FiCpu,
  FiHeart,
  FiMessageCircle,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import HeadTitle from "../components/HeadTitle";
import { availableDays, bodyTypes, interests } from "../const";
import { getTraits, setTraits } from "../func";
import { useSupabase } from "../SupabaseProvider";

function Traits() {
  const { user } = useSupabase();
  const queryClient = useQueryClient();
  const { data: traits } = useQuery({
    queryKey: ["traits"],
    queryFn: () => getTraits(user?.id),
    enabled: !!user?.id,
  });
  const { mutate: submitMutation } = useMutation({
    mutationKey: ["setTraits"],
    mutationFn: async (values) => {
      if (!traits?.id) return;
      await setTraits({
        ...values,
        id: user?.id,
        updated_at: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["traits"] });
    },
  });
  const traitsForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      introvert_extrovert: traits?.introvert_extrovert || 3,
      calm_energetic: traits?.calm_energetic || 3,
      logical_creative: traits?.logical_creative || 3,
      planner_spontaneous: traits?.planner_spontaneous || 3,
      group_one_on_one: traits?.group_one_on_one || 3,
      listener_talker: traits?.listener_talker || 3,
      interests: traits?.interests || [],
      available_days: traits?.available_days || "both",
      height_cm: traits?.height_cm || null,
      body_type: traits?.body_type || null,
    },
  });
  const [debouncedValues] = useDebouncedValue(traitsForm.values, 500);

  useEffect(() => {
    if (!user?.id) return;
    submitMutation({
      ...debouncedValues,
      id: user.id,
      updated_at: new Date().toISOString(),
    });
  }, [debouncedValues, submitMutation, user?.id]);

  return (
    <Stack align="center">
      <HeadTitle title="Traits" subtitle="Your personality traits" />

      <Center w={{ base: "95%", sm: "80%" }}>
        <Stack gap="md">
          <TraitLabel icon={FiUser} text="Introvert – Extrovert" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...traitsForm.getInputProps("introvert_extrovert")}
          />

          <TraitLabel icon={FiZap} text="Calm – Energetic" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...traitsForm.getInputProps("calm_energetic")}
          />

          <TraitLabel icon={FiCpu} text="Logical – Creative" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...traitsForm.getInputProps("logical_creative")}
          />

          <TraitLabel icon={FiCalendar} text="Planner – Spontaneous" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...traitsForm.getInputProps("planner_spontaneous")}
          />

          <TraitLabel icon={FiUsers} text="Group – One on One" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...traitsForm.getInputProps("group_one_on_one")}
          />

          <TraitLabel icon={FiMessageCircle} text="Listener – Talker" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...traitsForm.getInputProps("listener_talker")}
          />
          <Divider my="md" variant="solid" />

          <TraitLabel icon={FiHeart} text="Interests" />
          <Chip.Group multiple {...traitsForm.getInputProps("interests")}>
            <Group wrap="wrap" gap="xs">
              {interests.map((interest) => (
                <Chip
                  key={interest.value}
                  value={interest.value}
                  variant="outline"
                >
                  {interest.label}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
          <Divider my="md" variant="solid" />

          <TraitLabel icon={FiClock} text="Available Days" />
          <Chip.Group
            multiple={false}
            {...traitsForm.getInputProps("available_days")}
          >
            <Group wrap="wrap" gap="xs">
              {availableDays.map((day) => (
                <Chip key={day.value} value={day.value}>
                  {day.label}
                </Chip>
              ))}
            </Group>
          </Chip.Group>

          <NumberInput
            label={
              <Group gap="xs">
                <FiArrowUp size={14} />
                <Text size="sm">Height (cm)</Text>
              </Group>
            }
            placeholder="Optional"
            min={100}
            max={250}
            {...traitsForm.getInputProps("height_cm")}
            onBlur={() => submitMutation(traitsForm.values)}
          />

          <TraitLabel icon={FiActivity} text="Body Type" />
          <Chip.Group
            multiple={false}
            {...traitsForm.getInputProps("body_type")}
          >
            <Group wrap="wrap" gap="xs">
              {bodyTypes.map((type) => (
                <Chip key={type.value} value={type.value}>
                  {type.label}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Stack>
      </Center>
    </Stack>
  );
}

export default Traits;
export function TraitLabel({ icon, text }) {
  const Icon = icon;
  return (
    <Group gap="xs">
      <Icon size={18} />
      <Text fw={500}>{text}</Text>
    </Group>
  );
}
