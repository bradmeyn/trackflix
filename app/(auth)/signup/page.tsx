import { faCircleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUpPage() {
  return (
    <div className="mx-auto my-20 h-auto w-full max-w-[30rem] rounded bg-slate-800 p-6 py-12 shadow-2xl">
      <h1 className="mb-8 text-4xl font-extrabold text-white">Sign Up</h1>
      <form>
        <div className="mb-5">
          <label
            className="mb-1 block text-sm font-semibold text-slate-200"
            // htmlFor={id}
          >
            Email
          </label>
          <input
            // id={id}
            // type={type}
            // placeholder={placeholder}
            className="flex w-full items-center justify-between rounded border-2 border-slate-600 bg-slate-800 p-3 text-start text-slate-50 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            // {...register}
          />
          <small className="mt-1 flex items-center gap-1 text-sm text-red-300">
            <FontAwesomeIcon icon={faCircleExclamation} />
            {/* <span>{error}</span> */}
          </small>
        </div>

        <button className="w-full rounded bg-slate-500 p-4 hover:bg-slate-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}
