import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React from "react";
import AddressForm from "../Auth/AddressForm";

function DeliveryformDailogBox({ open, handler, onSubmit }) {
  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader>Delivery Contact information</DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-2">
          <Input label="Contact Person's Full Name" />
          <AddressForm />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" className="mr-1" onClick={handler}>
          Cancel
        </Button>
        <Button variant="gradient" color="green">
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DeliveryformDailogBox;
