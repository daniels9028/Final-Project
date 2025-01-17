import React, { useState } from "react";

import { createComment, deleteComment } from "../services/Comment";

const useComment = () => {
  const [submitComment, setSubmitComment] = useState(false);

  const [form, setForm] = useState({
    comment: "",
  });

  const handleAddComment = async (postId) => {
    try {
      await createComment({ ...form, postId: postId });

      setForm({ ...form, comment: "" });
      setSubmitComment(!submitComment);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);

      setSubmitComment(!submitComment);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleAddComment,
    handleDeleteComment,
    form,
    setForm,
    submitComment,
  };
};

export default useComment;
