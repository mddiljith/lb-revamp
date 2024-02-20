import { Button, Input, Card } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api";
import { FaCamera } from "react-icons/fa6";

function PickupConfirmForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const router = useRouter();
  const { tripId } = router.query;
  //verify the docs
  //   Invoice/Delivery challan - can be uploaded by Shipper
  // e-way bill
  // LR receipt (Lorry receipt)
  // Insurance (if any)
  const onSubmit = async (data) => {
    const requestParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        trip_id: tripId,
        status_id: 6,
        docs: [
          {
            docs: data.invoiceNumber,
            doc_type: 'invoice',
            url: ''
          },
          {
            docs: data.ewaybillNumber,
            doc_type: 'ewaybill',
            url: ''
          }
        ] 
      }), // Change status to inprogress
    };
    console.log({requestParams})
    const result = await callApi(
      `/api/trip_docs`,
      requestParams
    );
    console.log({result})
    router.push(`/driver/mob/navigateTrip?tripId=${tripId}`);
  };

  return (
    <Card>
      <form
        className="flex flex-col gap-1 p-2 mt-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          variant="static"
          label="Invoice Number"
          // defaultValue={getValues().model}
          name="invoice_number"
          error={errors?.invoiceNumber?.message}
          {...register("invoiceNumber", {
            required: "This field is required",
          })}
        />
        <label htmlFor="invoice" className="w-32">
          <div className="flex gap-4  border p-5 bg-blue-50 rounded-md">
            <FiUpload size={28} />
            <span>Upload Invoice</span>
          </div>
        </label>

        <input
          id="invoice"
          type="file"
          hidden
          {...register("invoice", {
            // required: "This field is required",
          })}
        />
        <Input
          variant="static"
          label="Ewaybill Number"
          // defaultValue={getValues().model}
          name="Ewaybill_number"
          error={errors?.EwaybillNumber?.message}
          {...register("ewaybillNumber", {
            // required: "This field is required",
          })}
        />
        <label htmlFor="ewaybill" className="w-32">
          <div className="flex gap-4  border p-5 bg-blue-50 rounded-md">
            <FiUpload size={28} />
            <span>Upload Eway bill</span>
          </div>
        </label>

        <input
          id="ewaybill"
          type="file"
          hidden
          {...register("ewaybill", {
            // required: "This field is required",
          })}
        />
        <label htmlFor="pickupImage" className="w-32">
          <div className="flex gap-4  border p-5 bg-blue-50 rounded-md">
            <FaCamera size={28} />
            <span>Capture Pickup Image</span>
          </div>
        </label>

        <input
          id="pickupImage"
          type="file"
          hidden
          {...register("pickupImage", {
            // required: "This field is required",
          })}
        />

        <Button type="submit">COMPLETE PICKUP</Button>
      </form>
    </Card>
  );
}

export default PickupConfirmForm;
