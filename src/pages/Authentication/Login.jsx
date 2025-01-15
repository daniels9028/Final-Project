import React, { useEffect, useState } from "react";
import { LoginRequest } from "../../services/Authentication";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setError({});
      setLoading(true);

      const data = await LoginRequest(form);

      setToken(data.token);
      localStorage.setItem("token", data.token);

      setSuccess("Login was successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(
        error.message === "Wrong Password"
          ? { message: "Username or password is wrong" }
          : { message: error.message }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login | Instagram";
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
          <h1 className="mb-4 text-4xl font-bold">LOGIN TO YOUR ADVENTURE!</h1>
          <p className="text-lg">
            Join us for an exciting journey into the universe.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full p-8 bg-white rounded-lg shadow-lg md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
            LOGIN
          </h2>
          <p className="mb-6 text-center text-gray-600">
            Login with email address
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
