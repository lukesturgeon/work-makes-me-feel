import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import "./globals.css";
import UserNav from "@/components/user-nav";
import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "Work Makes Me Feel"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();  

  return (
    <html lang="en">

      <body
        className="antialiased flex flex-col min-h-screen"
      >

        <header className="sticky top-0 flex h-16 items-center gap-6 border-b bg-background px-6 ">

          {data.session && (
            <UserNav />
          )}

          {!data.session && (
            <Nav />
          )}        

        </header>

        {children}

      </body>
    </html>
  );
}
