import React from "react";
import { Input, Radio, Typography, Button } from "@material-tailwind/react";

import { useSetRecoilState } from "recoil";
import { searchReqState } from "@/context/SearchAtom";

function TruckSelection() {
  const setSearchReq = useSetRecoilState(searchReqState);
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  //error printing after each input should be coded
  const onSubmit = (truckReq) => {
    //update here
    console.log(truck);
    setSearchReq((prev) => {
      return {
        ...prev,
        ...truckReq,
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <Typography varient="h5">Type of Truck</Typography>
              <Radio
                id="truck-open"
                name="truck_type"
                label="Open"
                value="Open"
                checked={getValues().truck_type === "Open"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_type === "Open"}
                // onChange={handleChange}
              />
              <Radio
                id="truck-mini"
                name="truck_type"
                label="Small Truck"
                value="Small Truck"
                checked={getValues().truck_type === "Small Truck"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_type === "Small Truck"}
                // onChange={handleChange}
              />
              <Radio
                id="truck-container"
                name="truck_type"
                label="Container"
                value="Container"
                checked={getValues().truck_type === "Container"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_type === "Container"}
                // onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Select
                variant="static"
                label="Material Type"
                name="materialType"
                error={errors?.materialType?.message}
                {...register("materialType")}
              >
                <option value="" disabled>
                  Select Option
                </option>
                <Option value={1}>Industrial machine/spare parts /tools</Option>
                <Option value={2}>Plastic /Steel/Raw material</Option>
                <Option value={3}> Furniture </Option>
                <Option value={4}>other</Option> //map from a list
              </Select>
              <Input
                variant="static"
                color="indigo"
                label="Weight"
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
                label="Length"
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
                label="Height"
                size="md"
                placeholder="height in ft (optional)"
                name="height"
                {...register("height")}
                // value={search.height}
                // onChange={handleChange}
              />
            </div>
            <div>
              <Typography varient="h5">Truck length</Typography>
              <Radio
                id="truckLength"
                name="truckLength"
                label="14ft" //map through the database
                value="14ft"
                checked={getValues().truck_type === "14ft"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_length === "Open"}
                // onChange={handleChange}
              />
              <Radio
                id="truckLength"
                name="truckLength"
                label="17ft" //map through the database
                value="17ft"
                checked={getValues().truck_type === "17ft"}
                {...register("truck_type", {
                  required: "This field is required",
                })}
                // checked={search.truck_length === "Open"}
                // onChange={handleChange}
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
