"use client";
import Spinner from "@components/shared/Spinner";

type Props = {
  pending: boolean;
  label: string;
};

export function SubmitButton({ pending = false, label }) {
  return (
    <button
      type="submit"
      className="focus:ring-white-500 w-full gap-2 rounded bg-slate-900 py-3 px-4 font-semibold text-white hover:bg-slate-900/75 focus:outline-none focus:ring-2"
      disabled={pending}
    >
      {pending ? (
        <div className="flex w-full items-center justify-center">
          <Spinner />
          <span>Loading...</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
