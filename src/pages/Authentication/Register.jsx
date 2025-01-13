import React, { useState } from "react";
import { RegisterRequest } from "../../services/Authentication";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "Miftah Farhan",
    username: "miftahfarhan",
    email: "daniel@gmail1.com",
    password: "qwerty123",
    passwordRepeat: "qwerty123",
    phoneNumber: "08976041232",
    bio: "",
    website: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const register = async () => {
    try {
      const data = await RegisterRequest({ ...form, file });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} required />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
