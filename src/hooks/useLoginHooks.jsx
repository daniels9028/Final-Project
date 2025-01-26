import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginRequest } from "../services/Authentication";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../services/User";
import Swal from "sweetalert2";

const useLoginHooks = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
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

      localStorage.clear();

      const data = await LoginRequest(form);

      const dataProfile = await getLoggedUser(data.token);

      localStorage.setItem("user", JSON.stringify(dataProfile.data));

      localStorage.setItem("token", data.token);

      setAuth({ ...auth, user: dataProfile.data, token: data.token });

      Swal.fire({
        title: "Sukses",
        text: "Login berhasil",
        icon: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      Swal.fire({
        title: "Peringatan",
        text: "Email atau password Anda salah!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    handleLogin,
    handleChange,
    showPassword,
    loading,
    setShowPassword,
  };
};

export default useLoginHooks;
