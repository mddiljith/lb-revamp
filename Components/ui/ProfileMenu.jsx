import React from "react";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  HiOutlineLogout,
  HiOutlineCash,
  HiOutlineUserCircle,
} from "react-icons/hi";

function ProfileMenu({ logout, img_url }) {
  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          size="md"
          className="border border-gray-900 p-0.5"
          src={img_url}
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
  );
}

export default ProfileMenu;
