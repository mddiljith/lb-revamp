import React from "react";
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
  MobileNav,
} from "@material-tailwind/react";
import { useUser } from "@supabase/auth-helpers-react";

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
  const router = useRouter();
  const { logout, isLoading } = useLogout();
  console.log(user);

  return (
    <Navbar
      role="nav"
      className="flex justify-between px-10 w-full rounded-xl transition-all sticky top-1 z-40 py-3 shadow-md shadow-blue-gray-500/5"
      fullWidth
      blurred
    >
      {navList}
      <div className="flex items-center gap-1">
        {user ? (
          <Menu placement="bottom-end">
            <MenuHandler>
              <Avatar src={user?.user_metadata?.avatal_url} />
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
