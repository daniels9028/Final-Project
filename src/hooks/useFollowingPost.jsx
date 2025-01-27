import React, { useState } from "react";
import { getMyFollowingPost } from "../services/Post";

const useFollowingPost = () => {
  const [myFollowingPost, setMyFollowingPost] = useState([]);

  const [myFollowingPostPage, setMyFollowingPostPage] = useState({
    currentPage: 1,
  });

  const [loadingMyFollowingPost, setLoadingMyFollowingPost] = useState(false);
  const [hasMoreMyFollowingPost, setHasMoreMyFollowingPost] = useState(true);

  const handleMyFollowingPost = async () => {
    setLoadingMyFollowingPost(true);

    try {
      const { data } = await getMyFollowingPost({
        size: 10,
        page: myFollowingPostPage.currentPage,
      });

      if (data.posts.length === 0) {
        setHasMoreMyFollowingPost(false);
      } else {
        setMyFollowingPost((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMyFollowingPost(false);
    }
  };

  const handleScrollMyFollowingPost = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMoreMyFollowingPost &&
      !loadingMyFollowingPost
    ) {
      setMyFollowingPostPage((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  return {
    myFollowingPost,
    myFollowingPostPage,
    handleMyFollowingPost,
    handleScrollMyFollowingPost,
    loadingMyFollowingPost,
    hasMoreMyFollowingPost,
  };
};

export default useFollowingPost;
