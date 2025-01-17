import React, { useState } from "react";

import { createComment, deleteComment } from "../services/Comment";

const useComment = () => {
  const [submitComment, setSubmitComment] = useState(false);

  const [form, setForm] = useState({
    comment: "",
  });

  const handleAddComment = async (postId) => {
    try {
      const request = await createComment({ ...form, postId: postId });

      setForm({ ...form, comment: "" });
      setSubmitComment(!submitComment);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const request = await deleteComment(
        "2ca62e58-1ccf-475b-b0f8-c6fe43b8c7b9"
      );
      console.log(request);
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
