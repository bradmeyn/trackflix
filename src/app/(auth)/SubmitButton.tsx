"use client";

type Props = {
  pending: boolean;
  label: string;
};

export function SubmitButton({ pending = false, label }) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-slate-900 py-3 px-4 font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
      disabled={pending}
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
