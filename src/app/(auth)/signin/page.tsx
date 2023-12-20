import Link from "next/link";
import { GoogleSignInButton, GithubSignInButton } from "../AuthButtons";

export default function LoginPage() {
  return (
    <div className="mx-auto my-20 h-auto w-[80%] rounded bg-slate-800 p-12 text-start shadow-2xl md:w-[30rem]">
      <h1 className="mb-3 text-4xl font-extrabold text-white">Sign In</h1>
      <p className="text-slate-300">
        Sign in to create a watchlist, rate movies and track what you have
        watched.
      </p>

      <GithubSignInButton />
      <GoogleSignInButton />

      <Link
        href="/auth/github"
        className="text-slate-400 underline hover:text-white"
      >
        Just browse
      </Link>
    </div>
  );
}
