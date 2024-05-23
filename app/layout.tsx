import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header/page";
import { cookies } from 'next/headers';

import getServerSession from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { USER_SESSION_COOKIE_NAME, OWNER_SESSION_COOKIE_NAME } from '@/constants/constant';
import Header from "@/components/Header/page";
import { checkSession } from "@/actions/auth-action";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Njajan AE",
  description: "Explore Culinary",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authoptions);
  const session = await checkSession(); 
  console.log
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {
          session?.type === 'owner' ? null : <Header session={session?.value || null } />
        }
        {children}
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
      </body>
    </html>
  );
}
