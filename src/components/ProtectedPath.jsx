import { Navigate } from "react-router";
import { useSupabase } from "../SupabaseProvider";
import { WebShell } from "./WebShell";

export function ProtectedPath({ children }) {
  const { user } = useSupabase();
  if (!user) return <Navigate to="/" />;
  return <WebShell>{children}</WebShell>;
}

export default ProtectedPath;
