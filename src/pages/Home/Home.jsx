import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { AddPost, Navbar, Posts } from "../../components/index";
import useExplorePost from "../../hooks/useExplorePost";
import { useCrudPost } from "../../hooks";

const Home = () => {
  const { auth } = useAuth();

  const { handleExplorePost, explorePost, explorePage } = useExplorePost();

  const {
    formCrudPost,
    handleFileChangeCrudPost,
    handleChangeCrudPost,
    handleCreatePost,
    errorCrudPost,
    successCrudPost,
    isModalCrudPostOpen,
    openModalCrudPost,
    closeModalCrudPost,
    loadingCrudPost,
  } = useCrudPost();

  useEffect(() => {
    handleExplorePost();
    document.title = "Home | Instagram";
  }, []);

  useEffect(() => {
    handleExplorePost();
  }, [isModalCrudPostOpen]);

  return (
    <div>
      <Navbar auth={auth} />
      <AddPost
        auth={auth}
        isModalCrudPostOpen={isModalCrudPostOpen}
        closeModalCrudPost={closeModalCrudPost}
        openModalCrudPost={openModalCrudPost}
        formCrudPost={formCrudPost}
        handleFileChangeCrudPost={handleFileChangeCrudPost}
        handleChangeCrudPost={handleChangeCrudPost}
        handleCreatePost={handleCreatePost}
        successCrudPost={successCrudPost}
        errorCrudPost={errorCrudPost}
        loadingCrudPost={loadingCrudPost}
      />
      <Posts explorePost={explorePost} explorePage={explorePage} />
    </div>
  );
};

export default Home;
