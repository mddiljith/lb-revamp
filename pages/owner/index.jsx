import OwnerLayout from "@/Components/Owner/OwnerLayout";
import React from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

function OwnerHome() {
  return <div>OwnerHome/dashboard</div>;
}

export default OwnerHome;

OwnerHome.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;
};

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
    if (role != "2") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          initialSession: session,
          user: session.user,
          role: role
        },
      }
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};