import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createComment, deleteComment } from "../../services/Comment";

const DetailPost = () => {
  const { token } = useAuth();

  return <div></div>;
};

export default DetailPost;
