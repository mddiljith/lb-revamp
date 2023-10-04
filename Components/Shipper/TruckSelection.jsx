import React from "react";
import { Input, Radio, Typography, Button } from "@material-tailwind/react";

import { useRecoilState } from "recoil";
import { searchReqState } from "@/context/SearchAtom";

function TruckSelection() {
  const [search, setSearch] = useRecoilState(searchReqState);
  const onSubmit = (e) => {
    e.preventDefault();
    //update here
  };

  const handleChange = (e) => {
    setSearch((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <section>
        <div>
          <Typography variant="h3" className="py-5 mb-3">
            Let`&apos;`s Know what you need to deliver!
          </Typography>
          {/* Radio form */}
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <Typography varient="h5">Type of Truck</Typography>
              <Radio
                id="truck-open"
                name="truck_type"
                label="Open"
                value="Open"
                checked={search.truck_type === "Open"}
                onChange={handleChange}
              />
              <Radio
                id="truck-mini"
                name="truck_type"
                label="Small Truck"
                value="Small Truck"
                checked={search.truck_type === "Small Truck"}
                onChange={handleChange}
              />
              <Radio
                id="truck-container"
                name="truck_type"
                label="Container"
                value="Container"
                checked={search.truck_type === "Container"}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Select variant="static" label="Material Type">
                <Option>Industrial machine/spare parts /tools</Option>
                <Option>Plastic /Steel/Raw material</Option>
                <Option>Furniture </Option> //map from a list
              </Select>
              <Input
                variant="static"
                color="indigo"
                label="Weight"
                size="md"
                placeholder="Weight in Kg"
                name="weight"
                value={search.weight}
                onChange={handleChange}
                required
              />
              <Input
                variant="static"
                color="indigo"
                label="Length"
                size="md"
                placeholder="length in ft (optional)"
                name="length"
                value={search.length}
                onChange={handleChange}
              />
              <Input
                variant="static"
                color="indigo"
                label="Height"
                size="md"
                placeholder="height in ft (optional)"
                name="height"
                value={search.height}
                onChange={handleChange}
              />
            </div>
            <div>
              <Typography varient="h5">Truck length</Typography>
              <Radio
                id="truckLength"
                name="truckLength"
                label="14ft" //map through the database
                value="14ft"
                checked={search.truck_length === "Open"}
                onChange={handleChange}
              />
              <Radio
                id="truckLength"
                name="truckLength"
                label="17ft" //map through the database
                value="17ft"
                checked={search.truck_length === "Open"}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" color="deep-purple" className="mt-5">
              <span>Submit</span>
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default TruckSelection;
