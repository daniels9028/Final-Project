import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { Navbar, Posts } from "../../components/index";
import useExplorePost from "../../hooks/useExplorePost";

const Home = () => {
  const { auth } = useAuth();

  const { handleExplorePost, explorePost, explorePage } = useExplorePost();

  useEffect(() => {
    handleExplorePost();
    document.title = "Home | Instagram";
  }, []);

  return (
    <div>
      <Navbar auth={auth} />
      <Posts explorePost={explorePost} explorePage={explorePage} />
    </div>
  );
};

export default Home;
