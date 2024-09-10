import Link from "next/link"
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work Makes Me Feel"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased flex flex-col min-h-screen"
      >

        <header className="sticky top-0 flex h-16 items-center gap-6 border-b bg-background px-6 ">

          <nav className="w-full gap-6 font-medium flex flex-row text-sm justify-between">
            <Link
              href="/chat"
              className="text-foreground transition-colors hover:text-foreground font-bold"
            >
              Work Makes Me Feel
            </Link>

            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Logout
            </Link>
          </nav>

        </header>

        {children}

      </body>
    </html>
  );
}
