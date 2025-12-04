import { CiHome, CiLogin } from "react-icons/ci";
import { logout } from "./SupabaseProvider";

export const paths = {
  home: {
    path: "/Home",
    label: "Home",
    icon: CiHome,
    callBack: () => {},
  },
  login: {
    path: "/",
    label: "Login",
    icon: CiLogin,
    callBack: () => {
      logout();
    },
  },
};
