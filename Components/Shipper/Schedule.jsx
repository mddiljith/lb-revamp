import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchReqState, mapState } from "@/context/SearchAtom";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useCreateSearch } from "@/hooks/search/useCreateSearch";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api";

function Schedule() {
  const [search, setSearch] = useRecoilState(searchReqState);
  const mapData = useRecoilValue(mapState);
  const [option, setOption] = useState();
  const router = useRouter();

  const handleScheduleOption = (value) => {
    setOption(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(search);
    const { distance, duration, eloc1, eloc2 } = mapData;
    const requestParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...search, distance, duration, eloc1, eloc2 }),
    };

    const { search_request } = await callApi(
      "/api/search_requests",
      requestParams
    );

    router.push(`shipper/${search_request.id}`);
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
      <section>
        <Typography variant="h3" className="py-5 mb-3">
          When you want to get picked up ?
        </Typography>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <select
              onChange={handleScheduleOption}
              value={option}
              label="Schedule"
            >
              <option value={true}>Pickup Now</option>
              <option value={false}>Schedule later</option>
            </select>
            <Input
              type="date"
              label="Pickup Date"
              variant="static"
              disabled={option}
              name="scheduled_at"
              value={search.scheduled_at}
              onChange={handleChange}
            />
            <Input
              type="time"
              label="Pickup time"
              variant="static"
              disabled={option}
              name="scheduled_time"
              value={search.scheduled_time}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" color="deep-purple" className="mt-5">
            <span>Submit</span>
          </Button>
        </form>
      </section>
    </>
  );
}

export default Schedule;
