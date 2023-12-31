import { Avatar, Button, Navbar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const navList = (
  <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <li>
      <Link href="/">
        <Typography
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Home
        </Typography>
      </Link>
    </li>
    <li>
      <Link href="/">
        <Typography
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          About Us
        </Typography>
      </Link>
    </li>
    <li>
      <Link href="/">
        <Typography
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Services
        </Typography>
      </Link>
    </li>
  </ul>
);

function NavbarHome() {
  const router = useRouter();
  return (
    <Navbar className="mx-auto max-w-screen px-4 py-2 lg:px-8 lg:py-4 sticky top-0 z-10 h-max rounded-none">
      <div className="flex justify-between">
        <div className="flex text-center items-center justify-center gap-2">
          <Avatar src="/shipping.png" alt="logo" variant="square" />
          <Typography variant="h3" color="blue-gray">
            LetsBuild
          </Typography>
        </div>

        <div className="hidden lg:block">{navList}</div>
        <div className="flex gap-2">
          <Button
            variant="gradient"
            onClick={() => router.push("/auth/signUp")}
          >
            Sign Up
          </Button>
          <Button variant="outlined" onClick={() => router.push("/auth/login")}>
            Sign In
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default NavbarHome;
