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

function NavbarMain() {
  const { user, isLoading: isLoading2 } = useUserRole();
  const router = useRouter();
  const [avatar, setAvatar] = useState("/user.png");
  const [role, setRole] = useState();
  const { logout, isLoading } = useLogout();
  useEffect(() => {
    setAvatar(user?.user_metadata?.avatar_url);
    setRole("/" + user?.role_meta_data[0]?.role_meta_data?.role_descr);
  }, [user]);

  return (
    <Navbar
      role="nav"
      className="flex justify-between w-full transition-all sticky top-0 z-40 py-2 border border-gray-300 border-solid p-0 shadow-none text-gray-900"
      fullWidth
      blurred
    >
      <NavList role={user?.role_meta_data[0]?.role_meta_data?.role_descr} />
      <div className="flex items-center gap-1">
        {user ? (
          <Menu placement="bottom-end">
            <MenuHandler>
              <Avatar src={avatar} />
            </MenuHandler>
            <MenuList>
              <MenuItem>
              <Link href=""><b>{user?.email}</b>({user?.role_meta_data[0]?.role_meta_data?.role_descr})</Link>
              </MenuItem>
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

export const NavList = ({ role }) => {
  return (
    <ul className="flex justify-between p-4 items-center gap-8 float-right ml-auto">
      <li>
        <Link href="/" className="text-sm">Home</Link>
      </li>
      <li>
        <Link href={`${role}/dashboard`} className="text-sm">Dashboard</Link>
      </li>
      <li>
        <Link href="/" className="text-sm">Feature</Link>
      </li>
    </ul>
  );
};
