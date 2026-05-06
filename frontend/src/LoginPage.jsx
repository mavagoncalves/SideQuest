import React from "react";
import { Mail, Lock } from "lucide-react";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-900 text-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 bg-slate-800">
        <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>

        <p className="text-slate-300 text-lg max-w-md">
          Login to continue using your dashboard and manage your projects.
        </p>

        <div className="mt-10 bg-slate-700 rounded-2xl p-6 w-[350px]">
          <h2 className="text-2xl font-semibold mb-4">
            Dashboard Preview
          </h2>

          <div className="space-y-3">
            <div className="h-3 bg-cyan-400 rounded w-3/4"></div>
            <div className="h-3 bg-violet-400 rounded w-1/2"></div>
            <div className="h-3 bg-cyan-400 rounded w-2/3"></div>
          </div>
        </div>
      </div>


      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Login</h2>

          <p className="text-slate-400 mb-8">
            Enter your account details below.
          </p>

  <div className="mb-5">
            <label className="block mb-2 text-sm">
              Email
            </label>

            <div className="flex items-center bg-slate-700 rounded-xl px-4 py-3">
              <Mail size={18} className="text-slate-400 mr-3" />

              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 text-sm">
              Password
            </label>

            <div className="flex items-center bg-slate-700 rounded-xl px-4 py-3">
              <Lock size={18} className="text-slate-400 mr-3" />

              <input
                type="password"
                placeholder="********"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" />
              Remember me
            </label>

            <button className="text-cyan-400 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl py-3 font-semibold">
            Login
          </button>


          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-slate-600"></div>

            <span className="px-3 text-slate-400 text-sm">
              or
            </span>

            <div className="flex-1 h-px bg-slate-600"></div>
          </div>


          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3">
              Google
            </button>

            <button className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3">
              GitHub
            </button>
          </div>


          {/* Signup */}
          <p className="text-center text-slate-400 mt-6">
            Don’t have an account?{" "}
            <span className="text-cyan-400 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage