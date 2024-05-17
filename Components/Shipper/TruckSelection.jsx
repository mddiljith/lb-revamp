import React from "react";
import {
  Input,
  Radio,
  Typography,
  Button,
  Select,
  Option,
  Card,
} from "@material-tailwind/react";

import { useSetRecoilState } from "recoil";
import { searchReqState, showTruckSearchState } from "@/context/SearchAtom";
import { useForm } from "react-hook-form";
import JourneyStrip from "./JourneyStrip";

function TruckSelection() {
  const setSearchReq = useSetRecoilState(searchReqState);
  const setshowTruckSearch = useSetRecoilState(showTruckSearchState);
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  //error printing after each input should be coded
  const onSubmit = (truckReq) => {
    // e.PreventDefault();

    setSearchReq((prev) => {
      return {
        ...prev,
        ...truckReq,
      };
    });

    setshowTruckSearch(false);
  };

  return (
    <>
      <JourneyStrip/>
      <div className="flex flex-row justify-center bg-white w-full">
        <div className="w-1/2">
          <Typography variant="h3" className="mt-6">
            Choose your delivery
          </Typography>
          <Typography variant="small" className="mb-5">
            Please provide truck details to carry your goods conviniently
          </Typography>
          {/* Radio form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <Typography variant="paragraph">Type of Truck</Typography>
              <Radio
                variant="paragraph"
                id="truck-open"
                name="truck_type"
                label={
                  <Typography variant="paragraph">Open</Typography>
                }
                value="Open"
                // checked={getValues().truck_type === "Open"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_type === "Open"}
                // onChange={handleChange}
              />
              <Radio
                id="truck-mini"
                name="truck_type"
                label={
                  <Typography variant="paragraph">Small Truck</Typography>
                }
                value="Small Truck"
                {...register("truck_type", {
                  required: "This field is required",
                })}
              />
              <Radio
                id="truck-container"
                name="truck_type"
                label={
                  <Typography variant="paragraph">Container</Typography>
                }
                value="Container"
                // checked={getValues().truck_type === "Container"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_type === "Container"}
                // onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              {/* <Select
                variant="static"
                label="Material Type"
                name="materialType"
                error={errors?.materialType?.message}
                {...register("material", { required: true })}
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="IM">Industrial machine/spare parts /tools</option>
                <option value="PSL">Plastic /Steel/Raw material</option>
                <Option value="FUR"> Furniture </Option>
                <Option value="OTH">other</Option>
              </Select> */}
              <Input
                variant="static"
                color="indigo"
                label={
                  <Typography variant="paragraph">Weight</Typography>
                }
                size="md"
                placeholder="Weight in Kg"
                name="weight"
                {...register("weight", {
                  required: "This field is required",
                })}
                // value={search.weight}
                // onChange={handleChange}
                // required
              />
              <Input
                variant="static"
                color="indigo"
                label={
                  <Typography variant="paragraph">Length</Typography>
                }
                size="md"
                placeholder="length in ft (optional)"
                name="length"
                {...register("length")}
                // value={search.length}
                // onChange={handleChange}
              />
              <Input
                variant="static"
                color="indigo"
                label={
                  <Typography variant="paragraph">Height</Typography>
                }
                size="md"
                placeholder="height in ft (optional)"
                name="height"
                {...register("height")}
                // value={search.height}
                // onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <Typography variant="paragraph">Truck length</Typography>
              <Radio
                id="truckLength"
                name="truckLength"
                label={
                  <Typography variant="paragraph">14ft</Typography>
                }
                value="14ft"
                {...register("truckLength", {
                  required: "This field is required",
                })}
                // checked={search.truck_length === "Open"}
                // onChange={handleChange}
              />
              <Radio
                id="truckLength"
                name="truckLength"
                label={
                  <Typography variant="paragraph">17ft</Typography>
                }
                value="17ft"
                {...register("truckLength", {
                  required: "This field is required",
                })}
                // checked={search.truck_length === "Open"}
                // onChange={handleChange}
              />
            </div>
            <Button type="submit" className="mt-5 w-full">
              <span>Submit</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TruckSelection;
