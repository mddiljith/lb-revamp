import { Avatar, Navbar, Switch } from "@material-tailwind/react";
import React from "react";
import { MdMenu, MdClose } from "react-icons/md";

function NavbarMob() {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 text-black  ">
      <div className="flex justify-between text-center items-center">
        <Avatar src="/user.png" />

        <Switch color="green" label="online" />

        <MdMenu size={28} />
      </div>
    </Navbar>
  );
}

export default NavbarMob;
