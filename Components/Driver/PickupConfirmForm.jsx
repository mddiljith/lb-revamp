import { Button, Input, Card } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api";

function PickupConfirmForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const router = useRouter();
  const {tripId} = router.query
  //verify the docs
  //   Invoice/Delivery challan - can be uploaded by Shipper
  // e-way bill
  // LR receipt (Lorry receipt)
  // Insurance (if any)
  const onSubmit = async (data) => {
    const requestParams = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tripId, status_id: 6 }), // Change status to inprogress
    };
    const result = await callApi(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips/${tripId}`, requestParams)
    if (result) {
      router.push('/driver/trips/')
    }
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
        <label htmlFor="invoice" className="w-4/12">
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
          {...register("EwaybillNumber", {
            // required: "This field is required",
          })}
        />
        <label htmlFor="invoice" className="w-4/12">
          <div className="flex gap-4  border p-5 bg-blue-50 rounded-md">
            <FiUpload size={28} />
            <span>Upload Eway bill</span>
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
        <Button type="submit">Submit</Button>
      </form>
      <Button>Generate LR</Button>
    </Card>
  );
}

export default PickupConfirmForm;
