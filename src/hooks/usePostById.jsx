import React, { useState } from "react";
import { getPostById } from "../services/Post";

const usePostById = () => {
  const [postById, setPostById] = useState();
  const [totalComment, setTotalComment] = useState(0);

  const handleGetPostById = async (postId) => {
    try {
      const { data } = await getPostById(postId);

      setPostById(data);
      setTotalComment(data.comments.length);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleGetPostById, totalComment };
};

export default usePostById;
