import React, { useState } from "react";
import { LoginRequest } from "../../services/Authentication";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "daniel@gmail.com",
    password: "qwerty123",
  });

  const login = async () => {
    try {
      const data = await LoginRequest(form);

      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={login}>login</button>
    </div>
  );
};

export default Login;
