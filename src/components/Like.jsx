import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import useLike from "../hooks/useLike";

const Like = ({ explore }) => {
  const { handleLike, handleUnlike, like, totalLikes } = useLike(explore);

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
