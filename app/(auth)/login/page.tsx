import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="my-8 flex-grow text-center md:my-12">
      <div className="mb-24">
        <h1 className="h-100 mx-auto mb-10 text-6xl font-extrabold text-white md:mb-12  md:text-7xl lg:text-8xl   ">
          <div>Browse less.</div>
          <div>Watch more.</div>
        </h1>

        <p className="container mx-auto mb-10 block max-w-[800px] px-5  text-lg text-slate-200 md:text-2xl">
          Watchflix is a tool designed to simplify your movie search, so you can
          spend less time endlessly scrolling on movie night.
        </p>
        <Link href="/movies">
          <button className="rounded-md bg-blue-600 px-5 py-3 text-lg font-semibold hover:bg-blue-500">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
