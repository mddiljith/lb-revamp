import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { searchReqState } from "@/context/SearchAtom";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

function Schedule() {
  const [search, setSearch] = useRecoilState(searchReqState);
  const [option, setOption] = useState();
  const [searchRequest, setSearchRequest] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(search);
    const requestParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search }),
    };
    const searchRequestResp = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/search_requests`,
      requestParams
    );
    setSearchRequest(searchRequestResp)
  };

  const handleChange = (e) => {
    if (option) {
      setSearch((prev) => {
        return {
          ...prev,
          scheduled_at: new Date().toJSON().slice(0, 10),
          // scheduled_time: new Date().toLocaleTimeString(),
        };
      });
    } else {
      setSearch((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          // scheduled_time: new Date().toLocaleTimeString(),
        };
      });
    }

    //1. data push to searchReq.  - > search reqid
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
            <Select onChange={() => setOption} value={option} label="Schedule">
              <Option value={1}>Pickup Now</Option>
              <Option value={0}>Schedule later</Option>
            </Select>
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
