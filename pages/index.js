// import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";

import { useLogout } from "@/hooks/auth/useLogout";
import Link from "next/link";
import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import Navbar from "@/Components/ui/NavbarMain";
import { useUserRole } from "@/hooks/auth/useUserRole";
import SignInForm from "@/Components/Auth/SigninForm";
import { useRouter } from "next/router";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const router = useRouter();

  const supabase = useSupabaseClient();
  // const { user, userRole } = useUserRole();
  const { login, isLoading: isLoading2 } = useLoginGoogle();
  const { logout, isLoading } = useLogout();
  const user = useUserRole();
  console.log(user.user)

  if(user?.user?.id) {
    console.log('redirecting to dashboard', )
    const userRoleDesc = user?.user?.role_meta_data[0]?.role_meta_data.role_descr
    console.log(userRoleDesc)
    router.push(`/${userRoleDesc}`)
  }

  const handleclick = async () => {
    const { data: session } = await supabase.auth.getSession();
    console.log(session);
    toast.info("displaying session");
  };

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

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  let role = null;
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  async function getUserRole(user_id) {
    let { data: role, error } = await supabase
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)

    return role
  }

  if (session) {
    const data = await getUserRole(session.user.id)
    role = data[0]?.role_meta_data?.role_id
    if (role) {
      return {
        props: {
          initialSession: session,
          user: session.user,
          role: role
        },
      };
    } else {
      return {
        redirect: {
          destination: "/auth/user-role",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
