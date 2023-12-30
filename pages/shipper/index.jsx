import Schedule from "@/Components/Shipper/Schedule";
import SearchForm from "@/Components/Shipper/SearchForm";
import TruckSelection from "@/Components/Shipper/TruckSelection";
import Navbar from "@/Components/ui/NavbarMain";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
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
    console.log("GetMapToken:")
    const tokenData = await callApi(`/api/map/map_token`)
    console.log(tokenData);
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
      <main
        // style={homeImg}
        className="flex flex-row justify-between  bg-fixed bg-bottom bg-cover  h-screen"
      >
        <div className=" top-10 bg-white w-96 ml-5 rounded-lg p-4 shadow-md">
          {showSearch && <SearchForm />}

          {!showSearch && showTruckSearch && <TruckSelection />}

          {!showSearch && !showTruckSearch && <Schedule />}
          
          {/* <Schedule /> */}
        </div>
        <div className="h-full w-full">
          {!showSearch && route_path && <Map path={route_path} />}
        </div>
      </main>
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
