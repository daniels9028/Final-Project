import React, { useEffect } from "react";
import { alternativeImageUrlPost } from "../assets";
import DetailPost from "./DetailPost";
import { useComment, useNavigateUser, usePostById } from "../hooks";
import { useAuth } from "../context/AuthContext";

const ListMyPost = ({ post }) => {
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
      />
    </>
  );
};

export default ListMyPost;
