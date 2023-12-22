"use client";

import logo from "@public/logo.png";
import Image from "next/image";
import Link from "next/link";
import type { User } from "next-auth";

import SearchModal from "./Search/SearchModal";
import ProfileDropdown from "./ProfileDropdown";
import Example from "./ProfileDropdown";

type Props = {
  user?: User;
};

export default function Header({ user }: Props) {
  return (
    <header className="relative bg-slate-900  p-3">
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

        {user ? (
          <ProfileDropdown user={user} />
        ) : (
          <Link
            href={"/signin"}
            className="rounded bg-violet-600 py-2 px-4 text-white transition-colors duration-300 hover:bg-violet-700"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
