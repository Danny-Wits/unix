import { notifications } from "@mantine/notifications";
import { queryClient } from "./main";
import supabase from "./supabase";
const showErrorNotification = (msg) => {
  notifications.show({
    title: "Error",
    message: msg,
    color: "red",
  });
};
export const getProfile = async (id) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) showErrorNotification(error.message);
  return profile;
};
export const setProfile = async (profile) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profile.id)
    .select("*");
  if (error) showErrorNotification("Error updating profile");
  return data;
};
export const uploadProfilePic = async (pic, id) => {
  if (!pic) return showErrorNotification("No image selected");
  if (pic.size > 4 * 1024 * 1024)
    return showErrorNotification("Image size too large . Limit is 4mb");
  const path = `${id}/avatar.png`;
  const { data, error } = await supabase.storage
    .from("profile-pics")
    .upload(path, pic, {
      upsert: true,
      cacheControl: "3600",
    });
  if (error) showErrorNotification("Error uploading image");
  if (data) {
    notifications.show({
      color: "green",
      title: "Image uploaded",
      message: "Image uploaded successfully",
    });
    queryClient.refetchQueries({ queryKey: ["profilePicPath"] });
  } else
    notifications.show({
      title: "Error",
      message: "Image upload failed",
      color: "red",
    });
  return data;
};
export const getProfilePicPath = (id) => {
  const path = `${id}/avatar.png`;
  const { data } = supabase.storage.from("profile-pics").getPublicUrl(path);
  return `${data.publicUrl}?t=${Date.now()}`;
};
