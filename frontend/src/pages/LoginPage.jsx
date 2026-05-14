import { useState } from "react";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axiosClient";

import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx"

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Could not log in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff7f4] text-slate-900">

    <Navbar></Navbar>

      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 px-6 py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="mx-auto mt-3 max-w-lg">
          Login to continue finding student collaborators and projects.
        </p>
      </section>

      <section className="mx-auto max-w-md px-6 py-10">
        <form
          className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your account details below.
          </p>

          {errorMessage && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-orange-200 px-3 py-3">
            <Mail size={18} className="text-orange-500" />
            <input
              id="email"
              className="w-full outline-none"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label
            className="mt-4 block text-sm font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-orange-200 px-3 py-3">
            <Lock size={18} className="text-orange-500" />
            <input
              id="password"
              className="w-full outline-none"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
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
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link className="font-extrabold text-orange-600 hover:text-orange-700" to="/register">
            Sign up
            </Link>
          </p>
        </form>
      </section>

    <Footer></Footer>

    </main>
  );
}

export default LoginPage;
