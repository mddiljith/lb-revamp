import React from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useVehicles } from "@/hooks/vehicles/useVehicles";
import { Button, Card, Spinner } from "@material-tailwind/react";
import VehicleTable from "@/Components/Owner/VehicleTable";
import OwnerLayout from "@/Components/Owner/OwnerLayout";
import { useRouter } from "next/router";
import { FaPlusCircle } from "react-icons/fa";
import AddvehicleForm from "@/Components/Owner/AddVehicleForm";
import { useRecoilState } from "recoil";
import { showAddvehicleState } from "@/context/VehicleAtom";

function Trucks({ user, role }) {
  const router = useRouter();
  const [showAddvehicle, setShowAddVehicle] =
    useRecoilState(showAddvehicleState);
  const { isLoading, error, vehicles } = useVehicles();

  return (
    <Card className="p-2 mt-6 w-full">
      {isLoading && !error ? (
        <Spinner />
      ) : (
        <>
          {showAddvehicle && <AddvehicleForm />}
          <VehicleTable vehicleData={vehicles} />
        </>
      )}
    </Card>
  );
}

export default Trucks;

Trucks.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;

  // <SidebarLayout sidelinks={OWNER_SIDELINKS}>{page}</SidebarLayout>;
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
      .from("users")
      .select("role_meta_data")
      .eq("id", user_id);

    return role;
  }

  if (session) {
    const data = await getUserRole(session.user.id);
    role = data[0]?.role_meta_data?.role_id;
    if (role) {
      //check role id whether it is owner or not ?
      return {
        props: {
          initialSession: session,
          user: session.user,
          role: role,
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
        destination: "/",
        permanent: false,
      },
    };
  }
};
