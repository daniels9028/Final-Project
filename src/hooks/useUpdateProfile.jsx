import React, { useState } from "react";
import { getUserById, updateProfile } from "../services/User";

const useUpdateProfile = () => {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const [user, setUser] = useState({});

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);

  const openModalUpdate = () => setModalUpdateOpen(true);
  const closeModalUpdate = () => setModalUpdateOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!form.bio) {
      newErrors.bio = "Bio is required.";
    }

    if (!form.website) {
      newErrors.website = "Website is required.";
    }

    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    }

    if (!file) {
      newErrors.profilePictureUrl = "Profile Picture is required.";
    }

    return newErrors;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setError({});
      setSuccess("");
      setLoading(true);

      await updateProfile({ ...form, file });

      setSuccess("Update profile was successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalUpdateOpen,
    openModalUpdate,
    closeModalUpdate,
    error,
    success,
    loading,
    form,
    file,
    user,
    handleUpdateProfile,
    form,
    handleChange,
    handleFileChange,
    setUser,
    setForm,
  };
};

export default useUpdateProfile;
