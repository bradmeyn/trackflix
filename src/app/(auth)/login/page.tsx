import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto my-20 h-auto w-[80%] md:w-[30rem] rounded bg-slate-800 p-6 py-12 shadow-2xl">
      <h1 className="mb-8 text-4xl font-extrabold text-white">Sign Up</h1>
      <LoginForm />
    </div>
  );
}
