import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/Authentication";
import {
  createPost,
  deletePost,
  getExplorePost,
  getMyFollowingPost,
  getPostById,
  getPostByUserId,
  updatePost,
} from "../../services/Post";

const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    caption: "Pengen ayam",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const logout = async () => {
    try {
      const data = await Logout(token);

      localStorage.clear();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const explorePost = async () => {
    try {
      const data = await getExplorePost({ size: 10, page: 1 });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postByUserId = async () => {
    try {
      const data = await getPostByUserId(
        { size: 10, page: 1 },
        "5b7a6783-2071-4e9f-9b8e-8e7fc4a981d4"
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postById = async () => {
    try {
      const data = await getPostById("7c8a3a30-7191-4b6c-bcd9-fef3468801ae");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const followingPost = async () => {
    try {
      const data = await getMyFollowingPost({ size: 10, page: 1 });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    try {
      const data = await createPost({ ...form, file });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    try {
      const data = await updatePost(
        { ...form, file },
        "763d2432-12fa-43e5-960e-7d0640d095a1"
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const destroyPost = async () => {
    try {
      const data = await deletePost("763d2432-12fa-43e5-960e-7d0640d095a1");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // explorePost();
    // postByUserId();
    // postById();
    // followingPost();
  }, []);

  return (
    <div>
      <button onClick={logout}>logout</button> <br />
      <input type="file" onChange={handleFileChange} required />
      <button onClick={create}>Create</button>
      <button onClick={update}>Update</button>
      <button onClick={destroyPost}>Delete</button>
    </div>
  );
};

export default Home;
