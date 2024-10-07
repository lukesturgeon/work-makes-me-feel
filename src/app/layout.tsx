
import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

import {
  ClerkProvider,
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import DataViz from '@/components/data-viz';

export const metadata: Metadata = {
  title: "Work Makes Me Feel"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <body className="antialiased flex flex-col min-h-screen">

          <div className='flex'>

            <aside className='fixed hidden lg:block w-1/2 flex-grow h-screen bg-primary text-primary-foreground '>

              <DataViz />

            </aside>

            <div className='lg:ml-auto w-full lg:w-1/2 min-h-screen flex flex-col'>

              <header className="px-6 pt-6 text-right">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>

              <main className="flex-grow">

                {children}

              </main>

            </div>



          </div>

        </body>
    </html>
    </ClerkProvider>
  );
}
