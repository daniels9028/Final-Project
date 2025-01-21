import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { AddPost, Navbar, Posts, Story } from "../../components/index";
import useExplorePost from "../../hooks/useExplorePost";
import { useCrudPost, useStory } from "../../hooks";

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
    isCreatePost,
  } = useCrudPost();

  const {
    myStory,
    myFollowingStories,
    handleGetMyStories,
    handleGetMyFollowingStories,
    formStory,
    errorFormStory,
    successFormStory,
    loadingFormStory,
    isModalFormStoryOpen,
    isFormStory,
    selectedStory,
    handleSelectStory,
    handleChangeFormStory,
    openModalFormStory,
    closeModalFormStory,
    handleCreateStory,
  } = useStory();

  useEffect(() => {
    handleExplorePost();
    handleGetMyStories();
    handleGetMyFollowingStories();
    document.title = "Home | Instagram";
  }, []);

  useEffect(() => {
    handleExplorePost();
  }, [isCreatePost]);

  useEffect(() => {
    handleGetMyStories();
  }, [isFormStory]);

  return (
    <div>
      <Navbar auth={auth} />

      <Story
        auth={auth}
        myStory={myStory}
        myFollowingStories={myFollowingStories}
        formStory={formStory}
        errorFormStory={errorFormStory}
        successFormStory={successFormStory}
        loadingFormStory={loadingFormStory}
        isModalFormStoryOpen={isModalFormStoryOpen}
        selectedStory={selectedStory}
        handleSelectStory={handleSelectStory}
        handleChangeFormStory={handleChangeFormStory}
        openModalFormStory={openModalFormStory}
        closeModalFormStory={closeModalFormStory}
        handleCreateStory={handleCreateStory}
      />

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
