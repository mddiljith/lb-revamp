import React, { useState } from "react";
import Navbar from "./NavbarMain";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import { IoIosMenu, IoIosLogOut } from "react-icons/io";
import NavbarMain from "./NavbarMain";
import { useLogout } from "@/hooks/auth/useLogout";

function SidebarLayout({ sidelinks, children }) {
  return (
    <div className=" flex flex-row justify-start ">
      <Sidebar sidelinks={sidelinks} />
      <main className="flex-1 w-full bg-gray-200 ml-5">
        {/* <NavbarMain /> */}
        {/* <Suspense fallback={<h1>Loading....</h1>}> */}
        <section>{children}</section>
        {/* </Suspense> */}
      </main>
    </div>
  );
}

function Sidebar({ sidelinks }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const { logout, isLoading } = useLogout();
  return (
    <aside
      className={`flex flex-col sticky duration-300 ${
        open ? "block sidebar-open" : " sidebar-close"
      } sidebar h-screen duration-300 relative`}
    >
      <Button className="absolute top-6 right-3 transform w-full" onClick={() => setOpen(!open)}>
        <IoIosMenu />
      </Button>
      <div className=" px-3 mb-4 flex items-center">
        <Avatar src="/shipping.png" alt="logo" />
        <Link href="/" className={`px-3 `}>
          <h3
            className={`font-bold text-xl text-blue-800 duration-200 ${
              !open && "scale-0"
            }`}
          >
            LetsBuild.
          </h3>
        </Link>
      </div>
      <div
        className={`absolute cursor-pointer right-8 top-2 inset-x-1.5 ${
          !open && "rotate-180"
        }`}
        style={{ fontSize: "22px" }}
        onClick={() => setOpen(!open)}
        variant="text"
      >
      </div>
      <div className="flex-1 text-gray-900 p-3">
        {sidelinks.map((item) => (
          <div
            className="cursor-pointer font-light mb-1 px-2 py-1 text-gray-900 text-base"
            key={item.key}
          >
            <Link href={item.path}>
              <Button
                variant={router.pathname === item.path ? "filled" : "text"}
                className="flex items-center gap-1 px-2 w-full text-xs font-normal text-gray-900 transition duration-75 normal-case bg-white shadow-none hover:font-semibold hover:shadow-none active:bg-light-blue-500 focus:bg-light-blue-500 hover:bg-light-blue-100 focus:font-semibold active:font-semibold"
              >
                <span className="text-xl">{item.icon}</span>
                <div
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {item.label}
                </div>
              </Button>
            </Link>
          </div>
        ))}
        <div className="cursor-pointer font-light mb-1 px-2 py-1 text-gray-900 text-base margin-auto" key="logout">
          <Link href="#">
            <Button
              variant="text"
              className="flex items-center gap-1 px-2 w-full text-xs font-normal text-gray-900 transition duration-75 normal-case bg-white shadow-none hover:font-semibold hover:shadow-none active:bg-light-blue-500 focus:bg-light-blue-500 hover:bg-light-blue-100 focus:font-semibold active:font-semibold"
              onClick={logout}
            >
              <span className="text-xl"><IoIosLogOut/></span>
              <div
                className={`${!open && "hidden"} origin-left duration-200`}
              >
                Signout
              </div>
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="hover:bg-gray-400 px-4">Settings</div> */}
    </aside>
  );
}

export default SidebarLayout;
