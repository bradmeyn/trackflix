import Link from "next/link";
import { GoogleSignInButton, GithubSignInButton } from "../AuthButtons";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  return (
    <div className="mx-auto my-20 h-auto w-[80%] rounded bg-slate-800 p-12 text-start shadow-2xl md:w-[30rem]">
      <h1 className="mb-3 text-4xl font-extrabold text-white">Sign In</h1>
      <p className="mb-8 text-slate-300">
        Create a watchlist, rate movies and track what you have watched.
      </p>

      <GithubSignInButton />
      {/* <GoogleSignInButton /> */}

      <div className="mt-8 text-center text-lg">
        <Link
          href="/"
          className="mx-auto  text-slate-300 hover:text-white hover:underline"
        >
          Continue browsing
          <ArrowRightIcon className="ml-2 inline-block w-5" />
        </Link>
      </div>
    </div>
  );
}
