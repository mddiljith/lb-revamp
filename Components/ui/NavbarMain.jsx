import React from "react";
import Link from "next/link";
import userimg from "@/public/user.png";
import { useLogout } from "@/hooks/useLogout";
import {
  HiOutlineLogout,
  HiOutlineCash,
  HiOutlineUserCircle,
  HiMenu,
} from "react-icons/hi";
import {
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Navbar,
  MobileNav,
} from "@material-tailwind/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const navList = (
  <ul className="flex justify-between p-4 items-center gap-8">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/">Feature</Link>
    </li>
  </ul>
);

function NavbarMain() {
  const user = useUser();
  const { logout, isLoading } = useLogout();
  console.log(user?.user_metadata);

  return (
    <Navbar className="mx-auto max-w-screen-xl flex justify-between py-2 px-4 lg:px-8 lg:py-4 items-center shadow-lg">
      <h3 className="font-bold text-xl text-blue-800 p-4">
        <Link href="/">
          <Avatar src="./shipping.png" size="sm" color="blue-gray" />
          <span className="ml-1">LETSBUILD.</span>

          <div className="hidden lg:block">{navList}</div>
          {user ? (
            <Menu>
              <MenuHandler>
                <Avatar
                  variant="circular"
                  size="md"
                  className="border border-gray-900 p-0.5"
                  src={user?.user_metadata?.avatar_url || userimg}
                  //find a way to add image for nongoogle user
                />
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <Link href="/auth/profile">
                    <div className="flex gap-1">
                      <HiOutlineUserCircle />
                      <span>Profile</span>
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/user/wallet">
                    <div className="flex gap-1">
                      <HiOutlineCash />
                      <span>Wallet</span>
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <div className="flex gap-1">
                    <HiOutlineLogout />
                    <span>log out</span>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button>
              <Link href={"/auth/login"}>SignIn</Link>
            </Button>
          )}
          <IconButton className="lg:hidden sm:block">
            <HiMenu />
          </IconButton>
        </Link>
      </h3>
    </Navbar>
  );
}

export default NavbarMain;
