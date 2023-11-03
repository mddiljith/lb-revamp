import Head from "next/head";
// import Footer from "./Footer";
import Navbar from "./NavbarMain";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>LETSBUILD:Truck booking App</title>
        <meta name="Truck Booking" content="Book your truck hassle free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
