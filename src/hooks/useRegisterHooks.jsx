import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "../services/Authentication";
import Swal from "sweetalert2";

const useRegisterHooks = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.passwordRepeat) {
      newErrors.passwordRepeat = "Confirmation password is required.";
    } else if (form.passwordRepeat.length < 6) {
      newErrors.passwordRepeat =
        "Confirmation Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setError({});
      setLoading(true);

      await RegisterRequest(form);

      Swal.fire({
        title: "Sukses",
        text: "Register berhasil",
        icon: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Peringatan",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleRegister,
    handleChange,
    showPassword,
    setShowPassword,
  };
};

export default useRegisterHooks;
