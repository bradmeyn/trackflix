import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div
      suppressHydrationWarning={true}
      className="mx-auto my-20 h-auto w-[80%] rounded bg-slate-800 p-6 py-12 shadow-2xl md:w-[30rem]"
    >
      <h1 className="mb-8 text-4xl font-extrabold text-white">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
