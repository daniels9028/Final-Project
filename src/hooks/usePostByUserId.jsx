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
      const { data } = await getPostByUserId(
        { size: 10, page: myPostPage.currentPage },
        id
      );

      setMyPost((prev) => [...prev, ...data.posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScrollMyPost = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setMyPostPage((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  return { myPost, myPostPage, postByUserId, handleScrollMyPost };
};

export default usePostByUserId;
