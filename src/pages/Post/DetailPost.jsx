import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createComment, deleteComment } from "../../services/Comment";
import { likePost, unlikePost } from "../../services/Like";

const DetailPost = () => {
  const { token } = useAuth();

  const [form, setForm] = useState({
    postId: "9a7f4133-2111-43b4-9d26-271e25b78679",
    comment: "Pengen juga jadinya",
  });

  const addComment = async () => {
    try {
      const request = await createComment(form);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const delComment = async () => {
    try {
      const request = await deleteComment(
        "2ca62e58-1ccf-475b-b0f8-c6fe43b8c7b9"
      );
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const like = async () => {
    try {
      const request = await likePost({
        postId: "8a79d3ec-d1d4-424c-99d5-3a0a066739a5",
      });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const unlike = async () => {
    try {
      const request = await unlikePost({
        postId: "8a79d3ec-d1d4-424c-99d5-3a0a066739a5",
      });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={addComment}>Comment</button>
      <button onClick={delComment}>Delete</button> <br />
      <button onClick={like}>Like</button>
      <button onClick={unlike}>Unlike</button>
    </div>
  );
};

export default DetailPost;
