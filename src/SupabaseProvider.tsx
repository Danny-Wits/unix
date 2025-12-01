import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabase";

const SupabaseContext = createContext<{
  supabase: SupabaseClient | null;
  user: User | undefined;
}>({ supabase: null, user: undefined });

export const SupabaseProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);
  const value = { supabase, user: session?.user };
  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};
export const login = (email: string, password: string) => {
  supabase.auth.signInWithPassword({ email, password });
};
export const signup = (email: string, password: string) => {
  supabase.auth.signUp({ email, password });
};
export const logout = () => supabase.auth.signOut();

export const useSupabase = () => useContext(SupabaseContext);

export default SupabaseProvider;
