import { Metadata } from "next";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Watchedflix",
  description: "An app for tracking movies and TV shows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gradient-to-t from-slate-800 to-slate-900 ">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
