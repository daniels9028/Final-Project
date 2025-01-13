import React, { useEffect, useState } from "react";
import { getLoggedUser, getUserById, updateProfile } from "../../services/User";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {
  const { token } = useAuth();

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "Miftah Farhan",
    username: "miftahfarhan",
    email: "daniel4@gmail1.com",
    phoneNumber: "08976041232",
    bio: "",
    website: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const profile = async () => {
    try {
      const dataProfile = await getLoggedUser(token.token);

      console.log(dataProfile);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    try {
      const dataUpdate = await updateProfile({ ...form, file });

      console.log(dataUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const anotherUser = async () => {
    try {
      const dataUser = await getUserById(
        "eb5ae708-7757-4cff-9668-2586fff95e3b"
      );

      console.log(dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} required />
      <button onClick={update}>Update</button>
      <button onClick={anotherUser}>Another User</button>
    </div>
  );
};

export default MyProfile;
