import React from "react";
import { Mail, Lock } from "lucide-react";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-900 text-white">
      
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 bg-slate-800">
        <h1 className="text-5xl font-bold mb-6">
          Welcome Back
        </h1>

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

</div>
  );
}

export default LoginPage