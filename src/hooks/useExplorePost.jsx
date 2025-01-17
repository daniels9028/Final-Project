import React, { useState } from "react";
import { getExplorePost } from "../services/Post";

const useExplorePost = () => {
  const [explorePost, setExplorePost] = useState([]);

  const [explorePage, setExplorePage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const handleExplorePost = async () => {
    try {
      const { data } = await getExplorePost({ size: 10, page: 1 });

      setExplorePost(data.posts);
      setExplorePage({
        ...explorePage,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { explorePost, explorePage, handleExplorePost };
};

export default useExplorePost;
