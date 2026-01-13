import { createBrowserRouter } from "react-router";
import Auth from "./Pages/Auth.jsx";
import Home from "./Pages/Home.jsx";
import ProfileSetup from "./Pages/ProfileSetup.jsx";
import Traits from "./Pages/Traits.jsx";
import ProtectedPath from "./components/ProtectedPath.jsx";
import Preferences from "./Pages/Preferences.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/Home",
    element: (
      <ProtectedPath>
        <Home></Home>
      </ProtectedPath>
    ),
  },
  {
    path: "/ProfileSetup",
    element: (
      <ProtectedPath>
        <ProfileSetup />
      </ProtectedPath>
    ),
  },
  {
    path: "/Traits",
    element: (
      <ProtectedPath>
        <Traits />
      </ProtectedPath>
    ),
  },
  {
    path: "/Preferences",
    element: (
      <ProtectedPath>
        <Preferences />
      </ProtectedPath>
    ),
  },
  {
    path: "*",
    element: <Auth />,
  },
]);

export default router;
