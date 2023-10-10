// import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";

import { useLogout } from "@/hooks/auth/useLogout";
import Link from "next/link";
import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import Navbar from "@/Components/ui/NavbarMain";
import { useUserRole } from "@/hooks/auth/useUserRole";

export default function Home() {
  // const router = useRouter();

  const supabase = useSupabaseClient();
  // const { user, userRole } = useUserRole();
  const { login, isLoading: isLoading2 } = useLoginGoogle();
  const { logout, isLoading } = useLogout();

  const handleclick = async () => {
    const { data: session } = await supabase.auth.getSession();
    console.log(session);
    toast.info("displaying session");
  };

  // console.log("resultfromuseuserhook", user, userRole);

  return (
    <>
      <Navbar />
      <Link href={"/auth/signUp"}>SignUp</Link>
      <Link href={"/auth/login"}>SignIn</Link>
      <Button onClick={login} disabled={isLoading2}>
        signin with google
      </Button>
      <Button onClick={logout} disabled={isLoading}>
        signOut
      </Button>

      <Button onClick={handleclick}>Get session</Button>
    </>
  );
}
