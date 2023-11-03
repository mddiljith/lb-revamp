import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchReqState } from "@/context/SearchAtom";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
// import { format } from "date-fns";
import { useCreateSearch } from "@/hooks/search/useCreateSearch";
import { useRouter } from "next/router";

function Schedule() {
  const [search, setSearch] = useRecoilState(searchReqState);
  const mapData = useRecoilValue(searchReqState);
  const [option, setOption] = useState();
  const { CreateSearch, isCreating } = useCreateSearch();
  const router = useRouter();
  // const [searchRequest, setSearchRequest] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(search);
    const { distance, duration } = mapData;
    CreateSearch(
      { search, distance, duration },
      {
        onSuccess: (data) => {
          console.log(data);
          router.push(`shipper/${data.id}`);
        },
      }
    );

    // setSearchRequest(searchRequestResp)
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
              <Option value={true}>Pickup Now</Option>
              <Option value={false}>Schedule later</Option>
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
