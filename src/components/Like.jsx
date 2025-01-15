import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { likePost, unlikePost } from "../services/Like";

const Like = ({ explore }) => {
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

  return (
    <>
      <FaHeart
        size={28}
        color={like ? "red" : "gray"}
        className="cursor-pointer"
        onClick={() =>
          like ? handleUnlike(explore?.id) : handleLike(explore?.id)
        }
      />
      <p>{totalLikes}</p>
    </>
  );
};

export default Like;
