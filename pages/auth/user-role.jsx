import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// import { updateUserRole } from "../../lib/models/userModel";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Radio,
  Button,
} from "@material-tailwind/react";
import NavbarHome from "@/Components/ui/NavbarHome";

function RolePage({ initialSession, user }) {
  const supabase = useSupabaseClient();
  const [role, setRole] = useState(["shipper", 1]);
  const router = useRouter();
  const handleSubmit = async () => {
    // session['user']['role_id'] = role;
    // write the role to database

    const updateUserRole = async (user, role) => {
      const { data, error } = await supabase
        .from("users")
        .update([{ role_meta_data: { role_id: role[1], role_descr: role[0] } }])
        .eq("id", user.id)
        .select();
    };

    updateUserRole(user, role);

    router.push("/auth/profile");
  };

  return (
    <>
      <NavbarHome userName={`${user?.user_metadata?.full_name}`} />
      <div className="w-2/6 mx-auto p-5 mt-10">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Choose your role
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Radio
              id="user"
              name="type"
              label="I want a truck"
              value="shipper-1"
              onChange={(e) => setRole(e.target.value.split("-"))}
              defaultChecked
            />
            <Radio
              id="owner"
              name="type"
              label="I'm a truck Owner"
              value="owner-2"
              onChange={(e) => setRole(e.target.value.split("-"))}
            />
            <Radio
              id="driver"
              name="type"
              label="I'm a driver"
              value="driver-3"
              onChange={(e) => setRole(e.target.value.split("-"))}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default RolePage;

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
