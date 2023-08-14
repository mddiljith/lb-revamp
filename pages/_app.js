import "@/styles/globals.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const queryClient = new QueryClient();

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        {getLayout(
          <>
            <Component {...pageProps} />
            <ToastContainer />
          </>
        )}
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
