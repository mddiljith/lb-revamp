import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { HiMenu } from "react-icons/hi";
import {
  Button,
  Avatar,
  IconButton,
  MobileNav,
} from "@material-tailwind/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ProfileMenu from "./ProfileMenu";

const navList = (
  <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/">Feature</Link>
    </li>
  </ul>
);

function Navbar() {
  const user = useUser();
  const [openNav, setOpenNav] = useState(false);
  const { logout, isLoading } = useLogout();
  console.log(user?.user_metadata);

  // useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpenNav(false)
  //   );
  // }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <h3 className="font-bold text-xl text-blue-800 p-4">
          <Link href="/">
            <Avatar src="./shipping.png" size="sm" color="blue-gray" />
            <span className="ml-1">LETSBUILD.</span>
          </Link>
        </h3>
        <div className="hidden lg:block">{navList}</div>
        {user ? (
          <ProfileMenu
            logout={logout}
            img_url={user?.user_metadata?.avatar_url}
          />
        ) : (
          <Button>
            <Link href={"auth/login"}>Sign In</Link>
          </Button>
        )}

        <IconButton
          className="lg:hidden sm:block"
          // onClick={setOpenNav((prev) => !prev)}
        >
          <HiMenu />
        </IconButton>
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}

export default Navbar;
