import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header/page";
import { cookies } from 'next/headers';

import getServerSession from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { SESSION_COOKIE_NAME } from '@/constants/constant';
import Header from "@/components/Header/page";

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
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        {children}
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
      </body>
    </html>
  );
}
