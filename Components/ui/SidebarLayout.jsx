import React from "react";
import Navbar from "./NavbarMain";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

function SidebarLayout({ sidelinks, children }) {
  return (
    <div className=" flex flex-row justify-start ">
      <Sidebar sidelinks={sidelinks} />
      <main className="flex-1 w-full  bg-gray-200 ">
        <Navbar />
        {/* <Suspense fallback={<h1>Loading....</h1>}> */}
        <section>{children}</section>
        {/* </Suspense> */}
      </main>
    </div>
  );
}

function Sidebar({ sidelinks }) {
  const router = useRouter();

  return (
    <aside className="space-x-1 flex flex-col w-1/6 overflow-y-auto py-4 h-screen sticky top-0 border border-gray-300 border-solid">
      <h3 className="font-bold text-xl text-blue-800 px-3 mb-4">
        <Link href="/" className="px-3">LETSBUILD.</Link>
      </h3>
      <div className="flex-1 text-gray-900 p-3">
        {sidelinks.map((item) => (
          <div
            className="cursor-pointer font-light mb-1 px-2 py-1 text-gray-900 text-base"
            key={item.key}
          >
            <Link href={item.path}>
              <Button
                variant={router.pathname === item.path ? "filled" : "text"}
                className="flex items-center gap-1 px-2 w-full text-base font-normal text-gray-900 transition duration-75 normal-case bg-white shadow-none hover:font-semibold hover:shadow-none active:bg-light-blue-500 focus:bg-light-blue-500 hover:bg-light-blue-100 focus:font-semibold active:font-semibold"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      {/* <div className="hover:bg-gray-400 px-4">Settings</div> */}
    </aside>
  );
}

export default SidebarLayout;
