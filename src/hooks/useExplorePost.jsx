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
      const { data } = await getExplorePost({
        size: 10,
        page: explorePage.currentPage,
      });

      setExplorePost((prev) => [...prev, ...data.posts]);
    } catch (error) {
      console.log(error);
    }
  };

  return { explorePost, explorePage, handleExplorePost, setExplorePage };
};

export default useExplorePost;
