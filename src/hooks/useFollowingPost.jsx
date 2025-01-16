import React, { useState } from "react";
import { getMyFollowingPost } from "../services/Post";

const useFollowingPost = () => {
  const [myFollowingPost, setMyFollowingPost] = useState([]);

  const [myFollowingPostPage, setMyFollowingPostPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const handleMyFollowingPost = async () => {
    try {
      const { data } = await getMyFollowingPost({ size: 10, page: 1 });

      setMyFollowingPost(data.posts);
      setMyFollowingPostPage({
        ...myFollowingPost,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { myFollowingPost, myFollowingPostPage, handleMyFollowingPost };
};

export default useFollowingPost;
