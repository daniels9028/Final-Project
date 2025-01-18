import React, { useState } from "react";
import { getPostById } from "../services/Post";

const usePostById = () => {
  const [postById, setPostById] = useState({
    caption: "",
    imageUrl: "",
  });

  const [comments, setComments] = useState();
  const [totalComment, setTotalComment] = useState(0);

  const [isModalPostOpen, setModalPostOpen] = useState(false);

  const openModalPost = () => setModalPostOpen(true);
  const closeModalPost = () => setModalPostOpen(false);

  const handleGetPostById = async (postId) => {
    try {
      const { data } = await getPostById(postId);

      setPostById({
        ...postById,
        caption: data.caption,
        imageUrl: data.imageUrl,
      });
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
    postById,
  };
};

export default usePostById;
