import { Metadata } from "next";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import logo from "@/public/logo.png";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="flex min-h-screen flex-col "
        style={{
          backgroundImage: `linear-gradient( to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url('/background.webp')`,
        }}
      >
        <header className="container mx-auto p-4">
          <Image src={logo} alt="" className="w-32" />
        </header>
        <main className={"flex grow flex-col "}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
