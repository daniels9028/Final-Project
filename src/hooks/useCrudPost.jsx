import React, { useState } from "react";
import { createPost, deletePost, updatePost } from "../services/Post";

const useCrudPost = () => {
  const [errorCrudPost, setErrorCrudPost] = useState({});
  const [successCrudPost, setSuccessCrudPost] = useState("");
  const [loadingCrudPost, setLoadingCrudPost] = useState(false);

  const [isModalCrudPostOpen, setModalCrudPostOpen] = useState(false);

  const [isDeletePost, setIsDeletePost] = useState(false);

  const [isUpdatePost, setIsUpdatePost] = useState(false);

  const openModalCrudPost = () => {
    setModalCrudPostOpen(true);
    setErrorCrudPost({});
    setSuccessCrudPost("");
  };
  const closeModalCrudPost = () => {
    setModalCrudPostOpen(false);
    setErrorCrudPost({});
    setSuccessCrudPost("");
  };

  const [fileCrudPost, setFileCrudPost] = useState(null);

  const [formCrudPost, setFormCrudPost] = useState({
    caption: "",
  });

  const handleChangeCrudPost = (e) => {
    setFormCrudPost({
      ...formCrudPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChangeCrudPost = (e) => {
    setFileCrudPost(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!formCrudPost.caption.trim()) {
      newErrors.caption = "Caption is required.";
    }

    if (!fileCrudPost) {
      newErrors.imageUrl = "Image is required.";
    }

    return newErrors;
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrorCrudPost(validationErrors);
      return;
    }

    try {
      setErrorCrudPost({});
      setSuccessCrudPost("");
      setLoadingCrudPost(true);

      await createPost({ ...formCrudPost, file: fileCrudPost });

      setSuccessCrudPost("Post created was successfully");

      setTimeout(() => {
        closeModalCrudPost();
      }, 1000);

      setFormCrudPost({ ...formCrudPost, caption: "" });
      setFileCrudPost(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCrudPost(false);
    }
  };

  const handleUpdatePost = async (e, postId) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrorCrudPost(validationErrors);
      return;
    }

    try {
      setErrorCrudPost({});
      setSuccessCrudPost("");
      setLoadingCrudPost(true);

      await updatePost({ ...formCrudPost, file: fileCrudPost }, postId);

      setSuccessCrudPost("Post updated was successfully");

      setTimeout(() => {
        closeModalCrudPost();

        setFormCrudPost({ ...formCrudPost, caption: "" });
        setFileCrudPost(null);
        setIsUpdatePost((prev) => !prev);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCrudPost(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);

      setIsDeletePost((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
    formCrudPost,
    fileCrudPost,
    handleFileChangeCrudPost,
    handleChangeCrudPost,
    errorCrudPost,
    successCrudPost,
    isModalCrudPostOpen,
    openModalCrudPost,
    closeModalCrudPost,
    loadingCrudPost,
    isDeletePost,
    isUpdatePost,
    fileCrudPost,
  };
};

export default useCrudPost;
