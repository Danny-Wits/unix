import { Navigate } from "react-router";
import { useSupabase } from "../SupabaseProvider";

function ProtectedPath({ children }) {
  const { user } = useSupabase();
  if (!user) return <Navigate to="/" />;
  return <>{children}</>;
}

export default ProtectedPath;
