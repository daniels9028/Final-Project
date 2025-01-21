import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLoginHooks from "../../hooks/useLoginHooks";

const Login = () => {
  const {
    error,
    success,
    handleLogin,
    handleChange,
    showPassword,
    loading,
    setShowPassword,
  } = useLoginHooks();

  useEffect(() => {
    document.title = "Sign In | Instagram";
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/037/814/719/small_2x/ai-generated-autumn-leaves-in-the-forest-nature-background-photo.jpg')",
      }}
    >
      <div className="flex w-full max-w-5xl p-4 mx-auto bg-transparent">
        {/* Left Side */}
        <div className="flex-col justify-center hidden w-1/2 p-8 text-white md:flex">
          <h1 className="mb-4 text-4xl font-bold">
            SIGN IN TO YOUR ADVENTURE!
          </h1>
          <p className="text-lg">
            Join us for an exciting journey into the universe.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full p-8 bg-white rounded-xl border border-slate-200 shadow-2xl md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
            SIGN IN
          </h2>
          <p className="mb-6 text-center text-gray-600">
            Sign In with email address
          </p>
          {error.message && (
            <p className="px-4 py-2 mb-2 tracking-wide text-white bg-red-500 rounded-lg">
              {error.message}
            </p>
          )}

          {success && (
            <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-green-500 rounded-lg">
              {success}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Input your email..."
                onChange={handleChange}
              />
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 hover:text-indigo-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-medium text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <Link
            to="/register"
            className="flex items-center justify-center mt-4"
          >
            <p>
              Don't have account?{" "}
              <span className="text-blue-500 underline cursor-pointer">
                Register Here!
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
