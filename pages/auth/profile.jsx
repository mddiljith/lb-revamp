import React from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

function Profile({ user }) {
  console.log(user);
  return <div>{user.email}</div>;
}

export default Profile;

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
