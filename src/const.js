import { CiHome } from "react-icons/ci";
import { FaGear, FaPerson } from "react-icons/fa6";
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
  traits: {
    path: "/Traits",
    label: "Traits",
    icon: FaGear,
    callBack: () => {},
  },
};

export const interests = [
  // Academic / Career
  { value: "coding", label: "Coding & Tech" },
  { value: "entrepreneurship", label: "Startups & Entrepreneurship" },

  // Creative / Cultural
  { value: "music", label: "Music" },
  { value: "art", label: "Art & Design" },

  // Entertainment
  { value: "movies", label: "Movies & Series" },
  { value: "gaming", label: "Gaming" },

  // Sports / Fitness
  { value: "sports", label: "Sports" },
  { value: "fitness", label: "Fitness & Gym" },

  // Lifestyle / Social
  { value: "travel", label: "Travel" },
  { value: "reading", label: "Reading & Books" },
];

export const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
export const availableDays = [
  { value: "weekday", label: "Weekday" },
  { value: "weekend", label: "Weekend" },
  { value: "both", label: "Both" },
];
export const bodyTypes = [
  { value: "slim", label: "Slim" },
  { value: "average", label: "Average" },
  { value: "athletic", label: "Athletic" },
  { value: "heavy", label: "Heavy" },
];
