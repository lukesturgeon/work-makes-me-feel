
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work Makes Me Feel"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body
        className="antialiased flex flex-col min-h-screen"
      >

        {children}

      </body>
    </html>
  );
}
