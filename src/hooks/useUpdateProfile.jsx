import React, { useState } from "react";
import { getUserById, updateProfile } from "../services/User";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useUpdateProfile = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const [formUpdateProfile, setFormUpdateProfile] = useState({});
  const [fileUpdateProfile, setFileUpdateProfile] = useState(null);

  const [user, setUser] = useState({});

  const [errorUpdateProfile, setErrorUpdateProfile] = useState({});
  const [successUpdateProfile, setSuccessUpdateProfile] = useState("");
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const [isModalUpdateProfileOpen, setModalUpdateProfileOpen] = useState(false);

  const openModalUpdateProfile = () => setModalUpdateProfileOpen(true);
  const closeModalUpdateProfile = () => setModalUpdateProfileOpen(false);

  const handleChangeUpdateProfile = (e) => {
    setFormUpdateProfile({
      ...formUpdateProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChangeUpdateProfile = (e) => {
    setFileUpdateProfile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!formUpdateProfile.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formUpdateProfile.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formUpdateProfile.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formUpdateProfile.bio) {
      newErrors.bio = "Bio is required.";
    }

    if (!formUpdateProfile.website) {
      newErrors.website = "Website is required.";
    }

    if (!formUpdateProfile.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    }

    if (!fileUpdateProfile) {
      newErrors.profilePictureUrl = "Profile Picture is required.";
    }

    return newErrors;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrorUpdateProfile(validationErrors);
      return;
    }

    try {
      setErrorUpdateProfile({});
      setSuccessUpdateProfile("");
      setLoadingUpdateProfile(true);

      await updateProfile({ ...formUpdateProfile, file: fileUpdateProfile });

      setSuccessUpdateProfile("Update profile was successfully");

      setAuth({ ...auth, token: "", user: "" });

      localStorage.clear();

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setErrorUpdateProfile({ message: error.message });
    } finally {
      setLoadingUpdateProfile(false);
    }
  };

  return {
    user,
    setUser,
    isModalUpdateProfileOpen,
    openModalUpdateProfile,
    closeModalUpdateProfile,
    errorUpdateProfile,
    successUpdateProfile,
    loadingUpdateProfile,
    formUpdateProfile,
    fileUpdateProfile,
    handleUpdateProfile,
    handleChangeUpdateProfile,
    handleFileChangeUpdateProfile,
    setFormUpdateProfile,
  };
};

export default useUpdateProfile;
