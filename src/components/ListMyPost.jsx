import React, { useEffect } from "react";
import { alternativeImageUrlPost } from "../assets";
import DetailPost from "./DetailPost";
import { useComment, useNavigateUser, usePostById } from "../hooks";
import { useAuth } from "../context/AuthContext";
import ModalCreateUpdatePost from "./ModalCreateUpdatePost";

const ListMyPost = ({
  post,
  selectedPost,
  handleSelectPost,
  isModalCrudPostOpen,
  closeModalCrudPost,
  handleUpdatePost,
  errorCrudPost,
  successCrudPost,
  formCrudPost,
  handleChangeCrudPost,
  handleFileChangeCrudPost,
  loadingCrudPost,
  fileCrudPost,
  openModalCrudPost,
  handleDeletePost,
}) => {
  const explore = post;

  const { handleNavigate } = useNavigateUser();

  const { auth } = useAuth();

  const { user } = auth;

  const {
    handleGetPostById,
    totalComment,
    isModalPostOpen,
    openModalPost,
    closeModalPost,
    comments,
  } = usePostById();

  const {
    handleAddComment,
    handleDeleteComment,
    form,
    setForm,
    submitComment,
  } = useComment();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddComment(explore?.id);
    }
  };

  useEffect(() => {
    handleGetPostById(explore?.id);
  }, [submitComment]);

  return (
    <>
      <img
        src={post.imageUrl || alternativeImageUrlPost}
        alt={post.id}
        className="object-cover transition-all h-[200px] w-full rounded-lg shadow-xl border cursor-pointer hover:opacity-70"
        onError={(e) => {
          e.target.src = alternativeImageUrlPost;
        }}
        onClick={openModalPost}
      />

      <DetailPost
        isOpen={isModalPostOpen}
        onClose={closeModalPost}
        explore={explore}
        comments={comments}
        auth={auth}
        totalComment={totalComment}
        form={form}
        setForm={setForm}
        handleKeyDown={handleKeyDown}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        handleNavigate={handleNavigate}
        openModalCrudPost={openModalCrudPost}
        handleSelectPost={handleSelectPost}
        handleDeletePost={handleDeletePost}
      />

      <ModalCreateUpdatePost
        isModalCrudPostOpen={isModalCrudPostOpen}
        closeModalCrudPost={closeModalCrudPost}
        handleUpdatePost={handleUpdatePost}
        errorCrudPost={errorCrudPost}
        successCrudPost={successCrudPost}
        user={user}
        formCrudPost={formCrudPost}
        handleChangeCrudPost={handleChangeCrudPost}
        handleFileChangeCrudPost={handleFileChangeCrudPost}
        loadingCrudPost={loadingCrudPost}
        fileCrudPost={fileCrudPost}
        selectedPost={selectedPost}
        title="Edit Postingan"
      />
    </>
  );
};

export default ListMyPost;
