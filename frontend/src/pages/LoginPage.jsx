import { GraduationCap, Lock, Mail } from "lucide-react";

function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fff7f4] text-slate-900">
      <header className="border-b border-orange-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white">
              <GraduationCap size={22} />
            </div>
            <span className="text-2xl font-bold text-orange-600">
              SideQuest
            </span>
          </div>

          <button className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white">
            I'm a Student
          </button>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 px-6 py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="mx-auto mt-3 max-w-lg">
          Login to continue finding student collaborators and projects.
        </p>
      </section>

      <section className="mx-auto max-w-md px-6 py-10">
        <form className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your account details below.
          </p>

          <label className="mt-6 block text-sm font-semibold">Email</label>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-orange-200 px-3 py-3">
            <Mail size={18} className="text-orange-500" />
            <input
              className="w-full outline-none"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <label className="mt-4 block text-sm font-semibold">Password</label>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-orange-200 px-3 py-3">
            <Lock size={18} className="text-orange-500" />
            <input
              className="w-full outline-none"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button className="font-semibold text-pink-600" type="button">
              Forgot password?
            </button>
          </div>

          <button
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-bold text-white"
            type="submit"
          >
            Login
          </button>

          <p className="mt-5 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button className="font-bold text-orange-600" type="button">
              Sign up
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
