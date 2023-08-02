import { Component, createEffect, createSignal } from "solid-js";
import AppRoutes from "./routes/AppRoutes";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "./auth/supabaseClient";
import Navbar from "./components/Navbar";
import User from "./pages/User";
import { useNavigate } from "@solidjs/router";

export const origin = window.location.href

const App: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null);
  const [userState, setUserState] = createSignal('');
  const navigate = useNavigate();
  createEffect(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const authenticated = user?.aud

    if(!user) {
      navigate("/login")
    } else {
      setUserState(authenticated || '');
    }
  });
  return (
    <div class="">
      {userState() ? (
        <div>
          <Navbar />
          <AppRoutes />
        </div>
      ) : (
        <div>
          <User />
        </div>
      )}
    </div>
  );
};

export default App;
