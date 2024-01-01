import { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Trackflix",
  description: "An app for tracking movies you have watched and want to watch.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gradient-to-t from-slate-800 to-slate-900 ">
        <Header user={session?.user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
