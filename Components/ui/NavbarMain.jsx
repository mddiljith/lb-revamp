import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import userimg from "@/public/user.png";
import { useLogout } from "@/hooks/auth/useLogout";
import { HiOutlineLogout, HiBell } from "react-icons/hi";
import {
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Navbar,
  Chip,
} from "@material-tailwind/react";

import { useUserRole } from "@/hooks/auth/useUserRole";

const navList = (
  <ul className="flex justify-between p-4 items-center gap-8">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/">Dashboard</Link>
    </li>
    <li>
      <Link href="/">Feature</Link>
    </li>
  </ul>
);

function NavbarMain() {
  const { user, isLoading: isLoading2 } = useUserRole();
  const router = useRouter();
  const [avatar, setAvatar] = useState();
  const [role, setRole] = useState();
  const { logout, isLoading } = useLogout();
  useEffect(() => {
    setAvatar(user?.user_metadata?.avatar_url);
    setRole("/"+user?.role_meta_data[0]?.role_meta_data?.role_descr)
  }, []);

  return (
    <Navbar
      role="nav"
      className="flex justify-between w-full transition-all sticky top-1 z-40 py-3 border border-gray-300 border-solid p-4 shadow-none text-gray-900"
      fullWidth
      blurred
    >
      <div className="flex gap-2">
        {user ? (
          <>
            <span className="font-semibold text-xl py-2">{user?.email}</span>
            <span className="py-2">
              <Chip
                variant="ghost"
                color="green"
                size="sm"
                value={user["role_meta_data"][0]?.role_meta_data?.role_descr}
              />
            </span>
          </>
        ) : (
          <div>None</div>
        )}
      </div>
      {navList}
      <div className="flex items-center gap-1">
        {user ? (
          <Menu placement="bottom-end">
            <MenuHandler>
              <Avatar src={avatar} />
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link href="/auth/profile">Profile</Link>
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
          <Button onClick={() => router.push("/auth/login")}> Sign In </Button>
        )}

        <Menu placement="bottom-end">
          <MenuHandler>
            <IconButton variant="text" color="blue-gray" size="lg">
              <HiBell size={28} />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem>Notification 1</MenuItem>
            <MenuItem>Notification 1</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
}

export default NavbarMain;
