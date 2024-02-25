// import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import { useLogout } from "@/hooks/auth/useLogout";
import Link from "next/link";
import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

import { useUserRole } from "@/hooks/auth/useUserRole";
import SignInForm from "@/Components/Auth/SigninForm";
import { useRouter } from "next/router";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import NavbarHome from "@/Components/ui/NavbarHome";
import FeatureCard from "@/Components/ui/FeatureCard";
import { FiFacebook } from "react-icons/fi";

import { FaInstagram } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  // const supabase = useSupabaseClient();
  // // const { user, userRole } = useUserRole();
  // const { login, isLoading: isLoading2 } = useLoginGoogle();
  // const { logout, isLoading } = useLogout();
  const { isLoading, user } = useUserRole();

  useEffect(() => {
    if (user?.id) {
      console.log("redirecting to dashboard");
      if (user?.role_meta_data[0]?.role_meta_data) {
        const userRoleDesc =
          user?.role_meta_data[0]?.role_meta_data?.role_descr;
        router.push(`/${userRoleDesc}`);
      } else router.push(`/auth/profile`);
    }
  }, [user]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <Spinner />
        </div>
      )}
      <NavbarHome />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col ">
          <section className="w-full p-6 sm:p-12 lg:p-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Fast and Reliable Truck Booking
            </h1>
            <p className="text-lg mb-4">
              Get your goods delivered with our efficient and affordable
              service.
            </p>
            <section>
              <input
                className="border p-2 rounded-md mb-2 w-full"
                placeholder="Enter pickup location"
                type="text"
              />
              <input
                className="border p-2 rounded-md mb-4 w-full"
                placeholder="Enter dropoff location"
                type="text"
              />
              <Link href={"/shipper"}>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Book Now
                </Button>
              </Link>
            </section>
          </section>

          <section className="p-6 md:p-12 lg:p-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <FeatureCard
                title={"Reliable"}
                content={
                  "We ensure your goods reach their destination on time, every time."
                }
              />
              <FeatureCard
                title={"Affordable"}
                content={
                  "Our prices are competitive, providing you with cost-effective delivery solutions."
                }
              />
              <FeatureCard
                title={"Flexible"}
                content={
                  "We offer a range of delivery options to suit your needs."
                }
              />
              <FeatureCard
                title={"Secure"}
                content={
                  "With our reliable tracking system, you can always know where your goods are."
                }
              />
            </div>
          </section>
          <section className="bg-[#f7f7f7] p-6 md:p-12 lg:p-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Happy Customers
            </h2>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <FeatureCard
                title="Shenil Padmanabhan"
                content={
                  "LetsBuild provided an excellent service. The booking process was smooth and the truck arrived on time."
                }
              />
              <FeatureCard
                title="Fathima Pyari"
                content={
                  "I've been using LetsBuild for years. They're always reliable and their customer service is top notch."
                }
              />
            </div>
          </section>
        </main>

        <footer className="flex flex-row justify-between items-center py-6 w-full shrink-0 px-4 md:px-6 border-t">
          <Typography>© TruckIt. All rights reserved.</Typography>
          <nav className="flex gap-4 sm:gap-6">
            <Link href={"/"}>Terms of Service</Link>
            <Link href={"/"}>Privacy Policy</Link>
            <Link href={"/"}>Contact Us</Link>
            <div className="flex gap-2">
              <FaInstagram />
              <FiFacebook />
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
}
