import React from "react";
import Navbar from "./NavbarMain";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

function SidebarLayout({ sidelinks, children }) {
  return (
    <div className=" flex flex-row justify-start ">
      <Sidebar sidelinks={sidelinks} />
      <main className="flex-1 bg-[#e5e5e5]  px-1">
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
    <aside className="bg-gradient-to-br from-gray-100 to-gray-200 space-x-1 flex flex-col w-60 overflow-y-auto py-4 px-3 h-screen sticky top-0">
      <h3 className="font-bold text-xl text-blue-800 p-1 mb-4">
        <Link href="/">LETSBUILD.</Link>
      </h3>
      <div className="flex-1 text-gray-900 border-b border-gray-600">
        {sidelinks.map((item) => (
          <div
            className="cursor-pointer font-light mb-1 px-2 py-1  text-gray-900 hover:bg-gray-200 hover:no-underline  rounded-lg text-base"
            key={item.key}
          >
            <Link href={item.path}>
              <Button
                variant={router.pathname === item.path ? "filled" : "text"}
                className="flex items-center gap-1 px-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-200"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="hover:bg-gray-400 rounded-lg ">bottom</div>
    </aside>
  );
}

export default SidebarLayout;
