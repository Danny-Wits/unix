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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TraitLabel } from "./Traits";

import {
  FiActivity,
  FiArrowDown,
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

import { getPreferences, setPreferences } from "../func";

import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import HeadTitle from "../components/HeadTitle";
import { availableDays, bodyTypes, interests } from "../const";
import { useSupabase } from "../SupabaseProvider";

function Preferences() {
  const { user } = useSupabase();
  const queryClient = useQueryClient();

  const { data: preferences } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => getPreferences(user?.id),
    enabled: !!user?.id,
  });

  const { mutate: submitMutation } = useMutation({
    mutationKey: ["setPreferences"],
    mutationFn: async (values) => {
      await setPreferences({
        ...values,
        id: user?.id,
        updated_at: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["preferences"] });
    },
  });

  const preferencesForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      introvert_extrovert: preferences?.introvert_extrovert || 3,
      calm_energetic: preferences?.calm_energetic || 3,
      logical_creative: preferences?.logical_creative || 3,
      planner_spontaneous: preferences?.planner_spontaneous || 3,
      group_one_on_one: preferences?.group_one_on_one || 3,
      listener_talker: preferences?.listener_talker || 3,

      interests: preferences?.interests || [],
      available_days: preferences?.available_days || "both",

      min_height_cm: preferences?.min_height_cm || null,
      max_height_cm: preferences?.max_height_cm || null,
      body_type: preferences?.body_type || null,
    },
  });
  const [debouncedValues] = useDebouncedValue(preferencesForm.values, 500);

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
      <HeadTitle
        title="Preferences"
        subtitle="This describes what works well for you."
      />

      <Center w={{ base: "95%", sm: "80%" }}>
        <Stack gap="md">
          <TraitLabel icon={FiUser} text="Introvert – Extrovert" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...preferencesForm.getInputProps("introvert_extrovert")}
          />

          <TraitLabel icon={FiZap} text="Calm – Energetic" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...preferencesForm.getInputProps("calm_energetic")}
          />

          <TraitLabel icon={FiCpu} text="Logical – Creative" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...preferencesForm.getInputProps("logical_creative")}
          />

          <TraitLabel icon={FiCalendar} text="Planner – Spontaneous" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...preferencesForm.getInputProps("planner_spontaneous")}
          />

          <TraitLabel icon={FiUsers} text="Group – One on One" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...preferencesForm.getInputProps("group_one_on_one")}
          />

          <TraitLabel icon={FiMessageCircle} text="Listener – Talker" />
          <Slider
            min={1}
            max={5}
            step={1}
            marks={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: String(v) }))}
            styles={{ markLabel: { display: "none" } }}
            {...preferencesForm.getInputProps("listener_talker")}
          />
          <Divider my="md" variant="solid" />
          <TraitLabel icon={FiHeart} text="Preferred Interests" />
          <Chip.Group multiple {...preferencesForm.getInputProps("interests")}>
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

          <TraitLabel icon={FiClock} text="Preferred Days" />
          <Chip.Group
            multiple={false}
            {...preferencesForm.getInputProps("available_days")}
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
                <Text size="sm">Minimum Height (cm)</Text>
              </Group>
            }
            placeholder="Optional"
            min={100}
            max={250}
            {...preferencesForm.getInputProps("min_height_cm")}
            onBlur={() => submitMutation(preferencesForm.values)}
          />

          <NumberInput
            label={
              <Group gap="xs">
                <FiArrowDown size={14} />
                <Text size="sm">Maximum Height (cm)</Text>
              </Group>
            }
            placeholder="Optional"
            min={100}
            max={250}
            {...preferencesForm.getInputProps("max_height_cm")}
            onBlur={() => submitMutation(preferencesForm.values)}
          />

          <TraitLabel icon={FiActivity} text="Preferred Body Type" />
          <Chip.Group
            multiple={false}
            {...preferencesForm.getInputProps("body_type")}
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

export default Preferences;
