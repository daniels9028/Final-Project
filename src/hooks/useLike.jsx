import React, { useState } from "react";
import { likePost, unlikePost } from "../services/Like";

const useLike = (explore) => {
  const [like, setLike] = useState(explore?.isLike);
  const [totalLikes, setTotalLikes] = useState(explore?.totalLikes);

  const handleLike = async (postId) => {
    try {
      await likePost({
        postId: postId,
      });

      setLike(true);
      setTotalLikes(totalLikes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await unlikePost({
        postId: postId,
      });

      setLike(false);
      setTotalLikes(totalLikes - 1);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleLike, handleUnlike, like, totalLikes };
};

export default useLike;
