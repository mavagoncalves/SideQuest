import { GraduationCap } from "lucide-react"
import React from "react"

import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx"

function SignupPage() {
  return (
    <main className="min-h-screen bg-[#fff7f4] font-sans text-slate-900">
      
      <Navbar></Navbar>

      <section className="bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-10 text-center text-white">
        <p className="mx-auto mb-4 w-fit rounded-full border border-white/60 px-4 py-1.5 text-sm font-bold">
          For students, by students
        </p>
        <h2 className="m-0 text-4xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-3 text-white">
          Sign up and start finding student projects.
        </p>
      </section>

      <section className="mx-auto my-9 w-[min(430px,calc(100%-32px))] rounded-xl border-2 border-orange-200 bg-white p-6 text-left">
        <h3 className="m-0 text-2xl font-bold">Sign Up</h3>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your details below.
        </p>

        <form className="mt-6 grid gap-3">
          <label className="text-sm font-bold" htmlFor="name">
            Full name
          </label>
          <input
            className="w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
            id="name"
            type="text"
            placeholder="Your name"
          />

          <label className="text-sm font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
            id="email"
            type="email"
            placeholder="you@example.com"
          />

          <label className="text-sm font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
            id="password"
            type="password"
            placeholder="Choose a password"
          />

          <label className="text-sm font-bold" htmlFor="role">
            I am a
          </label>
          <select
            className="w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
            id="role"
          >
            <option>Student</option>
            <option>Client</option>
          </select>

          <button
            className="mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-3 font-extrabold text-white"
            type="submit"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a className="font-extrabold text-orange-600 no-underline" href="/login">
            Login
          </a>
        </p>
      </section>

    <Footer></Footer>

    </main>
  )
}

export default SignupPage
