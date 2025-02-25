import React, { useState } from "react";
import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from "../services/Post";
import { uploadImage } from "../services/Upload";
import Swal from "sweetalert2";

const useCrudPost = (updateSinglePost, removeDeletedPost) => {
  const [errorCrudPost, setErrorCrudPost] = useState({});
  const [successCrudPost, setSuccessCrudPost] = useState("");
  const [loadingCrudPost, setLoadingCrudPost] = useState(false);

  const [isModalCrudPostOpen, setModalCrudPostOpen] = useState(false);

  const [isDeletePost, setIsDeletePost] = useState(false);

  const [isCreatePost, setIsCreatePost] = useState(false);

  const [isUpdatePost, setIsUpdatePost] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);

  const handleSelectPost = (post) => {
    setSelectedPost(post); // Pass selected post to the child component
  };

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

  const handleFileChangeCrudPost = async (e) => {
    const file = e.target.files[0];

    try {
      const { url } = await uploadImage(file);

      setFileCrudPost(url);
    } catch (error) {
      console.log(error);
    }
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
      setLoadingCrudPost(true);

      await createPost({ ...formCrudPost, imageUrl: fileCrudPost });

      Swal.fire({
        title: "Sukses",
        text: "Post berhasil ditambahkan",
        icon: "success",
      });

      setTimeout(() => {
        closeModalCrudPost();
      }, 1000);

      setFormCrudPost({ ...formCrudPost, caption: "" });
      setFileCrudPost(null);
      setIsCreatePost((prev) => !prev);
    } catch (error) {
      Swal.fire({
        title: "Peringatan",
        text: error.message,
        icon: "error",
      });
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

      await updatePost({ ...formCrudPost, imageUrl: fileCrudPost }, postId);

      const { data } = await getPostById(postId);

      updateSinglePost(data);

      Swal.fire({
        title: "Sukses",
        text: "Post berhasil diperbaharui",
        icon: "success",
      });

      setTimeout(() => {
        closeModalCrudPost();

        setFormCrudPost({ ...formCrudPost, caption: "" });
        setFileCrudPost(null);
        setIsUpdatePost(true);
        // window.location.reload();
      }, 1000);
    } catch (error) {
      Swal.fire({
        title: "Peringatan",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoadingCrudPost(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);

      setIsDeletePost((prev) => !prev);

      removeDeletedPost(postId);

      Swal.fire({
        title: "Sukses",
        text: "Post berhasil dihapus",
        icon: "success",
      });

      setIsDeletePost(true);
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: error.message,
        icon: "warning",
      });
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
    isCreatePost,
    selectedPost,
    handleSelectPost,
    setIsUpdatePost,
    setIsDeletePost,
  };
};

export default useCrudPost;
