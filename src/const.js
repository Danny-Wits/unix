import { CiHome } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
export const paths = {
  home: {
    path: "/Home",
    label: "Home",
    icon: CiHome,
    callBack: () => {},
  },

  profile: {
    path: "/ProfileSetup",
    label: "Profile Setup",
    icon: FaPerson,
    callBack: () => {},
  },
};

export const interests = [
  { value: "music", label: "Music" },
  { value: "movies", label: "Movies" },
  { value: "sports", label: "Sports" },
  { value: "books", label: "Books" },
  { value: "art", label: "Art" },
];
export const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
