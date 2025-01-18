import React, { useState } from "react";
import { getPostByUserId } from "../services/Post";

const usePostByUserId = (id) => {
  const [myPost, setMyPost] = useState([]);

  const [myPostPage, setMyPostPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const postByUserId = async () => {
    try {
      const { data } = await getPostByUserId({ size: 10, page: 1 }, id);

      console.log(data.posts);
      setMyPost(data.posts);
      setMyPostPage({
        ...myPost,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { myPost, myPostPage, postByUserId };
};

export default usePostByUserId;
