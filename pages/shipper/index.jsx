import Schedule from "@/Components/Shipper/Schedule";
import SearchForm from "@/Components/Shipper/SearchForm";
import TruckSelection from "@/Components/Shipper/TruckSelection";
import Navbar from "@/Components/ui/NavbarMain";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Typography } from "@material-tailwind/react";

import {
  mapState,
  showSearchState,
  showTruckSearchState,
  mapTokenState
} from "@/context/SearchAtom";
import React from "react";
import { useRecoilValue, useRecoilState} from "recoil";
import Map from "@/Components/Map/Map";
import { useQuery } from "@tanstack/react-query";

import { callApi } from "@/lib/utils/api";

function Shipper() {
  const showSearch = useRecoilValue(showSearchState);
  const showTruckSearch = useRecoilValue(showTruckSearchState);
  const { route_path, distance } = useRecoilValue(mapState);
  const [token, setToken] = useRecoilState(mapTokenState);

  const getMapToken = async () => {
    const tokenData = await callApi(`/api/map/map_token`)
    return tokenData
  }

  const {
    isLoading,
    data: mapToken,
    error,
  } = useQuery({
    queryKey: ["mapToken"],
    queryFn: getMapToken,
    onSuccess: (data) => {
      setToken(data);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-between bg-blue-400 relative">
        <div className="">
          <Typography variant="h2" className="ml-6 mb-2 mt-4 text-center">
            { showSearch && "Book your Truck"}
          </Typography>
          <Typography variant="lead" className="ml-6 mb-2 mt-4 text-center">
            { showSearch && "India's first Fleet Management & Truck Aggregator company."}
          </Typography>
        </div>
        <div className="w-full">
          {showSearch && <SearchForm />}

          {!showSearch && showTruckSearch && <TruckSelection />}

          {!showSearch && !showTruckSearch && <Schedule />}
          
          {/* <Schedule /> */}
        </div>
      </main>
      {/* <div className="h-full w-full">
        {!showSearch && route_path && <Map path={route_path} />}
      </div> */}
    </>
  );
}

export default Shipper;

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
    if (role != "1") {
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
