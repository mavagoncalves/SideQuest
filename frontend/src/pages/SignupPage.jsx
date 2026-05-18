import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apiClient from "../api/axiosClient";

import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function SignupPage() {
  const navigate = useNavigate();
  
  // form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "TALENT",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle typing in any input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Send the data to backend
      await apiClient.post("/auth/register", formData);
      
      toast.success("Account created successfully! Please log in.");
      navigate("/login"); // Send them to login so they can get their token
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 
        error.response?.data?.message || 
        "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff7f4] font-sans text-slate-900 flex flex-col">
      <Navbar />

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

      <section className="mx-auto my-9 w-[min(430px,calc(100%-32px))] rounded-xl border border-orange-200 bg-white p-6 text-left shadow-sm flex-grow">
        <h3 className="m-0 text-2xl font-bold">Sign Up</h3>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your details below.
        </p>

        {/* Display backend errors (like "Email already in use") */}
        {errorMessage && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          
          {/* Split Name into First and Last to match the backend DB */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-bold" htmlFor="firstName">
                First name
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
                id="firstName"
                type="text"
                placeholder="Maya"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold" htmlFor="lastName">
                Last name
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
                id="lastName"
                type="text"
                placeholder="Andersson"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
              id="password"
              type="password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="text-sm font-bold" htmlFor="role">
              I am a
            </label>
            <select
              className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/40 p-3 outline-orange-400"
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="TALENT">Student</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>

          <button
            className="mt-4 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-3 font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          {/* Changed standard <a> tag to React Router <Link> */}
          <Link className="font-extrabold text-orange-600 hover:text-orange-700" to="/login">
            Login
          </Link>
        </p>
      </section>

      <Footer />
    </main>
  );
}

export default SignupPage;