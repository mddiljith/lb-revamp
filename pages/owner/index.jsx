import OwnerLayout from "@/Components/Owner/OwnerLayout";
import React from "react";
import { useRecoilState } from "recoil";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Card, Typography, Spinner, Button } from "@material-tailwind/react";
import { useVehicles } from "@/hooks/vehicles/useVehicles";
import { FaPlusCircle } from "react-icons/fa";
import VehicleTable from "@/Components/Owner/VehicleTable";
import AddvehicleForm from "@/Components/Owner/AddVehicleForm";
import { showAddvehicleState } from "@/context/VehicleAtom";

function OwnerHome() {
  const { isLoading, error, vehicles } = useVehicles();
  const [showAddvehicle, setShowAddVehicle] = useRecoilState(showAddvehicleState);

  console.log({vehicles})
  return (
    <>
      {showAddvehicle && <AddvehicleForm />}

      {isLoading && !error ? (<div className="flex items-center justify-center h-screen bg-gray-100"><Spinner /></div>) : (
        <>
          { vehicles && <VehicleTable vehicleData={vehicles} />}
        </>
      )}
    </>
  );
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