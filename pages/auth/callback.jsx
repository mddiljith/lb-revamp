import React from "react";
import { Alert, Button } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import Link from "next/link";
import NavbarHome from "@/Components/ui/NavbarHome";

function callback() {
  return (
    <>
      <NavbarHome/>
      <div className="w-full mx-auto flex gap-2 mt-2">
        <Alert icon={<MdDone />} color="green">
          You have successfully verified your account.
        </Alert>
      </div>
      <div className="w-full mx-auto flex mt-5 item-center justify-center">  
        <Button className="text-center font-normal w-3/4">
          <Link href="/auth/login" className="font-medium">
            Click here to Sign In
          </Link>
        </Button>
      </div>
    </>
  );
}

export default callback;
