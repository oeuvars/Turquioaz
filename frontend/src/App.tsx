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
  const navigate = useNavigate();
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  });
  createEffect(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) {
      navigate("/login")
    }
  });
  return (
    <div class="">
      {session() ? (
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
