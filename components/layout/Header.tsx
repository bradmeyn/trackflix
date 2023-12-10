import logo from "../.././public/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/pro-light-svg-icons";
import SearchModal from "../Search/SearchModal";
import Link from "next/link";

export default function Header({ isAuthenticated = false }) {
  return (
    <header className="bg-slate-900 p-3  ">
      <div className="container mx-auto flex w-full items-center justify-between md:justify-between">
        <nav className="flex items-center gap-2 md:gap-6">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Watchedflix logo"
              width={100}
              height={50}
              priority
            />
          </Link>
          <Link
            href={"/"}
            className={`text-md font-semibold text-slate-400 hover:text-white `}
          >
            Home
          </Link>
          <Link
            href={"/movies"}
            className={`text-md font-semibold text-slate-400 hover:text-white `}
          >
            Discover
          </Link>
        </nav>
        <SearchModal />

        {isAuthenticated ? (
          <a className="flex items-center align-middle hover:text-white">
            <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
          </a>
        ) : (
          <div className="flex items-center gap-4">
            <button className="rounded py-2 px-4 text-white">Login</button>
            <button className="rounded bg-slate-600 py-2 px-4 text-white">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
