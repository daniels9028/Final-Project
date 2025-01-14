import React, { useEffect, useState } from "react";
import { getLoggedUser, getUserById, updateProfile } from "../../services/User";
import { useAuth } from "../../context/AuthContext";
import {
  followUser,
  getFollowersByUserId,
  getFollowingByUserId,
  getMyFollowers,
  getMyFollowing,
  unfollowUser,
} from "../../services/Follow";

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

  const follow = async () => {
    try {
      const request = await followUser({
        userIdFollow: "43516236-8bd5-4c43-98ac-8661f3d5b272",
      });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollow = async () => {
    try {
      const request = await unfollowUser(
        "43516236-8bd5-4c43-98ac-8661f3d5b272"
      );

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const myFollowing = async () => {
    try {
      const request = await getMyFollowing({ size: 10, page: 1 });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const myFollowers = async () => {
    try {
      const request = await getMyFollowers({ size: 10, page: 1 });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const followingByUserId = async () => {
    try {
      const request = await getFollowingByUserId(
        { size: 10, page: 1 },
        "43516236-8bd5-4c43-98ac-8661f3d5b272"
      );

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const followersByUserId = async () => {
    try {
      const request = await getFollowersByUserId(
        { size: 10, page: 1 },
        "43516236-8bd5-4c43-98ac-8661f3d5b272"
      );

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // profile();
    // myFollowing();
    // myFollowers();
    // followingByUserId();
    // followersByUserId();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} required />
      <button onClick={update}>Update</button>
      <button onClick={anotherUser}>Another User</button> <br />
      <button onClick={follow}>Follow</button>
      <button onClick={unfollow}>Unfollow</button>
    </div>
  );
};

export default MyProfile;
