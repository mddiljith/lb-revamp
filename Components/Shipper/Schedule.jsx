import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchReqState, mapState } from "@/context/SearchAtom";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useCreateSearch } from "@/hooks/search/useCreateSearch";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api";
import JourneyStrip from "./JourneyStrip";

function Schedule() {
  const [search, setSearch] = useRecoilState(searchReqState);
  const mapData = useRecoilValue(mapState);
  const [option, setOption] = useState(1);
  const router = useRouter();
  const handleScheduleOption = (value) => {
    setOption(() => value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { distance, duration, eloc1, eloc2 } = mapData;
    const requestParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...search, distance, duration, eloc1, eloc2 }),
    };

    const {search_request} = await callApi(
      `/api/search_requests`,
      requestParams
    );

    console.log('SEARCH REQUEST',{search_request})
    console.log('SEARCH REQUEST ID',search_request.id)
    if(search_request) {
      router.push(`shipper/${search_request.id}`);
    }
  };

  const handleChange = (e) => {
    if (option) {
      setSearch((prev) => {
        return {
          ...prev,
          scheduled_at: new Date().toJSON().slice(0, 10), //format(new Date(), "MM/dd/yyyy"), //
          scheduled_time: new Date().toLocaleTimeString(), //format(new Date(), "h `:` mm aaa "), //
        };
      });
    } else {
      setSearch((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }

    // push searrc/[searchId]  ---> search confirmation -->  pricing calculation api search req -> pay now
    //2. background - trip create , driver assigned , payment status true
  };
  return (
    <>
      <JourneyStrip/>
      <div className="flex flex-row justify-center bg-white w-full">
        <div className="w-1/2">
          <section>
            <Typography variant="h3" className="mt-6 mb-6">
              When you want to get picked up?
            </Typography>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
              <div className="flex flex-col w-72 gap-8">
                <select
                  onChange={(e) => handleScheduleOption(e.target.value)}
                  value={option}
                  label="Schedule"
                  size="lg"
                >
                  <option value={1}>Pickup Now</option>
                  <option value={0}>Schedule later</option>
                </select>
                {option == 0 && (
                  <>
                    <Input
                      type="date"
                      label="Pickup Date"
                      name="scheduled_at"
                      // disabled={option}
                      value={search.scheduled_at}
                      onChange={handleChange}
                    />
                    <Input
                      type="time"
                      label="Pickup time"
                      // disabled={option}
                      name="scheduled_time"
                      value={search.scheduled_time}
                      onChange={handleChange}
                    />
                  </>
                )}
              </div>
              <Button type="submit" className="mt-5">
                <span>Submit</span>
              </Button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Schedule;
