import DriverLayout from "@/Components/Driver/DriverLayout";
import React from "react";
import { useState, useEffect } from "react";
import GenericCard from "@/Components/ui/GenericCard";
import Trips from "@/Components/ui/Dashboard/Trips";
import ApprovalCard from "@/Components/Driver/ApprovalCard";
import { callApi } from "@/lib/utils/api";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

function DriverHome() {
  const [trips, setTrips] = useState([]);

  async function fetchTripsForDriver() {
    const requestParams = {
      headers: { "Content-Type": "application/json" },
    };
    const trips_data = await callApi(`/api/trips?status_id=4`, requestParams);
    setTrips(trips_data);
  }

  useEffect(() => {
    fetchTripsForDriver();
  }, []);

  return (
    <>
      <div className="flex mx-2">
        <div className="flex-1/2">
          <GenericCard
            title="Today's Revenue"
            content="100"
            notice="50 less than yesterday"
          />
        </div>
        <div className="flex-1/2">
          <GenericCard
            title="Current Month Revenue"
            content="1200"
            notice="120 less than last month"
          />
        </div>
        <div className="flex-1/2">
          <GenericCard
            title="This Year Revenue"
            content="13K"
            notice="5K less than last Year"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 w-16 mx-6">
          <Trips />
        </div>
        {trips.map((trip) => (
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
    </>
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
