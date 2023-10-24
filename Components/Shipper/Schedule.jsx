import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { searchReqState } from "@/context/SearchAtom";

function Schedule() {
  const [search, setSearch] = useRecoilState(searchReqState);
  const [option, setOption] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    //update here
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
