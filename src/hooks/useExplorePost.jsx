import React, { useState } from "react";
import { getExplorePost } from "../services/Post";

const useExplorePost = () => {
  const [explorePost, setExplorePost] = useState([]);

  const [explorePage, setExplorePage] = useState(1);

  const [loadingExplorePost, setLoadingExplorePost] = useState(false);
  const [hasMoreExplorePost, setHasMoreExplorePost] = useState(true);

  const handleExplorePost = async () => {
    setLoadingExplorePost(true);

    try {
      const { data } = await getExplorePost({
        size: 10,
        page: explorePage,
      });

      if (data.posts.length === 0) {
        setHasMoreExplorePost(false);
      } else {
        setExplorePost((prev) => [...prev, ...data.posts]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingExplorePost(false);
    }
  };

  const handleScrollExplore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMoreExplorePost &&
      !loadingExplorePost
    ) {
      setExplorePage((prevPage) => prevPage + 1);
    }
  };

  return {
    explorePost,
    explorePage,
    handleExplorePost,
    handleScrollExplore,
    loadingExplorePost,
    hasMoreExplorePost,
  };
};

export default useExplorePost;
