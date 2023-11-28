import React from "react";
import { Alert } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";

function callback() {
  return (
    <div className="w-full">
      <Alert icon={<MdDone />} color="green">
        You have successfully verified your accoutn
      </Alert>
    </div>
  );
}

export default callback;
