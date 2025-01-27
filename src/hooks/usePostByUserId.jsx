import React, { useState } from "react";
import { getPostByUserId } from "../services/Post";

const usePostByUserId = (id) => {
  const [myPost, setMyPost] = useState([]);

  const [totalPost, setTotalPost] = useState(0);

  const [myPostPage, setMyPostPage] = useState({
    currentPage: 1,
  });

  const [loadingMyPost, setLoadingMyPost] = useState(false);
  const [hasMoreMyPost, setHasMoreMyPost] = useState(true);

  const postByUserId = async () => {
    setLoadingMyPost(true);
    try {
      const { data } = await getPostByUserId(
        { size: 10, page: myPostPage.currentPage },
        id
      );

      if (data.posts.length === 0) {
        setHasMoreMyPost(false);
      } else {
        setMyPost((prev) => [...prev, ...data.posts]);
      }

      setTotalPost(data.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMyPost(false);
    }
  };

  const handleScrollMyPost = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMoreMyPost &&
      !loadingMyPost
    ) {
      setMyPostPage((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  return {
    myPost,
    myPostPage,
    postByUserId,
    handleScrollMyPost,
    loadingMyPost,
    hasMoreMyPost,
    totalPost,
  };
};

export default usePostByUserId;
