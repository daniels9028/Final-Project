import React, { useState } from "react";
import { createPost, deletePost, updatePost } from "../services/Post";

const useCrudPost = () => {
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalCreatePostOpen, setModalCreatePostOpen] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  const openModalCreatePost = () => {
    setModalCreatePostOpen(true);
    setError({});
    setSuccess("");
  };
  const closeModalCreatePost = () => {
    setModalCreatePostOpen(false);
    setError({});
    setSuccess("");
  };

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    caption: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.caption.trim()) {
      newErrors.caption = "Caption is required.";
    }

    if (!file) {
      newErrors.imageUrl = "Image is required.";
    }

    return newErrors;
  };

  const handleCreatePost = async (e) => {
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

      await createPost({ ...form, file });

      setSuccess("Post created was successfully");

      setTimeout(() => {
        closeModalCreatePost();
      }, 1000);

      setForm({ ...form, caption: "" });
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);

      setIsDelete((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
    form,
    file,
    handleFileChange,
    setForm,
    error,
    success,
    isModalCreatePostOpen,
    openModalCreatePost,
    closeModalCreatePost,
    loading,
    isDelete,
  };
};

export default useCrudPost;
