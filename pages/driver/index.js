import DriverLayout from "@/Components/Driver/DriverLayout";
import React from "react";
import { useState, useEffect } from "react";
import GenericCard from "@/Components/ui/GenericCard";
import Trips from "@/Components/ui/Dashboard/Trips";
import ApprovalCard from "@/Components/Driver/ApprovalCard";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";
import { useTrips } from "@/hooks/trips/useTrips";
import { DRIVER_TRIP_TABS, DRIVER_TRIP_HEADERS } from "@/lib/const/DashboardLinksConst";


function DriverHome() {
  let {isLoading, trips, error} = useTrips()
  console.log({trips})
  if(trips){
    trips = trips.filter(trip => trip.status_id === 4);
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-2 md:gap-2 md:p-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GenericCard
          title="Total Trips"
          content="125"
          notice="50 less than yesterday"
          icon="1"
        />
        <GenericCard
          title="Average Rating"
          content="4.5"
          notice="120 less than last month"
          icon="2"
        />
        <GenericCard
          title="Current Earnings"
          content="13K"
          notice="5K less than last Year"
          icon="3"
        />
      </div>
      <div className="flex">
        <div className="flex-1 w-16 mx-2">
          <Trips />
        </div>
        {trips && trips.map((trip) => (
          <div className="flex-1/2 mx-4 mt-10" key={trip.id}>
            <ApprovalCard
              source={trip.search_requests.source}
              destination={trip.search_requests.destination}
              scheduled_at={trip.scheduled_at}
              trackingId={trip.tracking_id}
              tripId={trip.id}
            />
          </div>
        ))}
      </div>
      <Link href={"/driver/mob"}>
        <Typography color="blue">Go to Mobile Version</Typography>
      </Link>
    </div>
  );
}

export default DriverHome;

DriverHome.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
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
    if (role != "3") {
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
          role: role,
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
