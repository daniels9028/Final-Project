import React, { useState } from "react";
import { createPost, deletePost, updatePost } from "../services/Post";

const useCrudPost = () => {
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    caption: "Pengen ayam",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreatePost = async () => {
    try {
      const data = await createPost({ ...form, file });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = async () => {
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

  const handleDeletePost = async () => {
    try {
      const data = await deletePost("763d2432-12fa-43e5-960e-7d0640d095a1");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleCreatePost, handleUpdatePost, handleDeletePost };
};

export default useCrudPost;
