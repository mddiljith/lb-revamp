// import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";

import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import { useLoginGoogle } from "@/hooks/useLoginGoogle";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

export default function Home() {
  // const router = useRouter();

  const supabase = useSupabaseClient();
  const { login, isLoading: isLoading2 } = useLoginGoogle();
  const { logout, isLoading } = useLogout();

  const handleclick = async () => {
    const { data: session } = await supabase.auth.getSession();
    console.log(session);
    toast.info("displaying session");
  };

  return (
    <>
      <Link href={"/auth/signup"}>SignUp</Link>
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
