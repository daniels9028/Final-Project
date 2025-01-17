import React, { useState } from "react";
import { getPostById } from "../services/Post";

const usePostById = () => {
  const [comments, setComments] = useState();
  const [totalComment, setTotalComment] = useState(0);

  const [isModalPostOpen, setModalPostOpen] = useState(false);

  const openModalPost = () => setModalPostOpen(true);
  const closeModalPost = () => setModalPostOpen(false);

  const handleGetPostById = async (postId) => {
    try {
      const { data } = await getPostById(postId);

      setComments(data.comments);
      setTotalComment(data.comments.length);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleGetPostById,
    totalComment,
    isModalPostOpen,
    openModalPost,
    closeModalPost,
    comments,
  };
};

export default usePostById;
