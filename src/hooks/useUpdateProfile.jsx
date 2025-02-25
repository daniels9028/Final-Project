import React, { useState } from "react";
import { getLoggedUser, getUserById, updateProfile } from "../services/User";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { uploadImage } from "../services/Upload";

const useUpdateProfile = () => {
  const { auth, setAuth } = useAuth();

  const [formUpdateProfile, setFormUpdateProfile] = useState({});
  const [fileUpdateProfile, setFileUpdateProfile] = useState(null);

  const [user, setUser] = useState({});

  const [errorUpdateProfile, setErrorUpdateProfile] = useState({});
  const [successUpdateProfile, setSuccessUpdateProfile] = useState("");
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const [isModalUpdateProfileOpen, setModalUpdateProfileOpen] = useState(false);

  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  const openModalUpdateProfile = () => setModalUpdateProfileOpen(true);
  const closeModalUpdateProfile = () => setModalUpdateProfileOpen(false);

  const handleChangeUpdateProfile = (e) => {
    setFormUpdateProfile({
      ...formUpdateProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChangeUpdateProfile = async (e) => {
    const file = e.target.files[0];

    try {
      const { url } = await uploadImage(file);

      setFileUpdateProfile(url);
    } catch (error) {
      console.log(error);
    }
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
      setIsUpdateProfile(false);
      setErrorUpdateProfile({});
      setSuccessUpdateProfile("");
      setLoadingUpdateProfile(true);

      await updateProfile({
        ...formUpdateProfile,
        profilePictureUrl: fileUpdateProfile,
      });

      const dataProfile = await getLoggedUser(auth.token);

      localStorage.setItem("user", JSON.stringify(dataProfile.data));

      Swal.fire({
        title: "Sukses",
        text: "Update profil berhasil dilakukan",
        icon: "success",
      });

      setAuth({ ...auth, user: dataProfile.data });

      closeModalUpdateProfile();

      setIsUpdateProfile(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Peringatan",
        text: error.message,
        icon: "error",
      });
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
    isUpdateProfile,
  };
};

export default useUpdateProfile;
