import React, { useState } from "react";
import { LoginRequest } from "../../services/Authentication";
import { useNavigate } from "react-router-dom";

import { loginBackground } from "../../assets/index";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "daniel@gmail.com",
    password: "qwerty123",
  });

  const login = async () => {
    try {
      const data = await LoginRequest(form);

      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full flex lg:flex-row flex-col items-center justify-center py-6 px-20 gap-8 h-full">
        <div className="flex flex-row justify-center lg:w-2/3 w-full">
          <div className="flex flex-col justify-center">
            <p className="font-bold text-[40px]">Sign In to Recharge Direct</p>
            <p className="mt-20 font-semibold text-[20px]">
              if you don't an account you can{" "}
              <span className="text-blue-500 underline cursor-pointer">
                Register here!
              </span>
            </p>
          </div>
          <img
            src={loginBackground}
            alt=""
            className="object-cover w-[300px]"
          />
        </div>
        <form className="flex flex-col justify-center lg:w-1/3 w-full">
          <p className="font-bold text-black mb-2 text-xl">Welcome Back 👋</p>
          <p className="text-gray-600 font-medium text-lg">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </p>
          <div className="flex flex-col justify-center mt-6 gap-6">
            <input
              type="text"
              placeholder="Input your email..."
              className="bg-[#EAF0F7] py-2 px-4 rounded-lg outline-none focus:border-blue-500 border-2 placeholder:italic"
            />
            <input
              type="password"
              placeholder="Input your password..."
              className="bg-[#EAF0F7] py-2 px-4 rounded-lg outline-none focus:border-blue-500 border-2 placeholder:italic"
            />
            <button className="bg-blue-500 py-2 text-white rounded-lg font-semibold tracking-wide hover:bg-blue-600 shadow-lg">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
