import OwnerLayout from "@/Components/Owner/OwnerLayout";
import React from "react";
import { useRecoilState } from "recoil";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import {
  Spinner,
  Card
} from "@material-tailwind/react";
import { useVehicles } from "@/hooks/vehicles/useVehicles";
import VehicleTable from "@/Components/Owner/VehicleTable";
import { showAddvehicleState } from "@/context/VehicleAtom";
import TripTableOwner from "@/Components/Owner/TripTableOwner";
import { useTrips } from "@/hooks/trips/useTrips";


function OwnerHome() {
  const { isLoading, error, vehicles } = useVehicles();
  const { isTripLoading, tripError, trips } = useTrips();
  return (
    <>
      <div className="flex flex-col"> 
      {isLoading && !error ? (<div className="flex items-center justify-center h-screen bg-gray-100"><Spinner /></div>) : (
        <div className="w-full h-90 mx-4 my-3 bg-white">
          { vehicles && <VehicleTable vehicleData={vehicles} />}
        </div>
      )}
      {
      isTripLoading && !tripError ? (<div className="flex items-center justify-center h-screen bg-gray-100"><Spinner /></div>) : (
        <div className="w-full h-90 mx-4 my-3 bg-white">
          { trips && <TripTableOwner trips={trips} /> }
        </div> 
      )}
      </div>
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