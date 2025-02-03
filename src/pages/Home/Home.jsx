import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { AddPost, Header, Navbar, Posts, Story } from "../../components/index";
import useExplorePost from "../../hooks/useExplorePost";
import { useCrudPost, useStory } from "../../hooks";

const Home = () => {
  const { auth } = useAuth();

  const {
    handleExplorePost,
    explorePost,
    explorePage,
    handleScrollExplore,
    loadingExplorePost,
    hasMoreExplorePost,
  } = useExplorePost();

  const {
    formCrudPost,
    handleFileChangeCrudPost,
    handleChangeCrudPost,
    handleCreatePost,
    errorCrudPost,
    isModalCrudPostOpen,
    openModalCrudPost,
    closeModalCrudPost,
    loadingCrudPost,
    isCreatePost,
    fileCrudPost,
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
    allStories,
    handleGetAllStories,
    allStoriesPage,
    setAllStoriesPage,
  } = useStory();

  useEffect(() => {
    // handleExplorePost();
    // handleGetMyStories();
    // handleGetMyFollowingStories();
    // handleGetAllStories();
    document.title = "Home | Vista";
  }, []);

  useEffect(() => {
    handleGetAllStories();
  }, [allStoriesPage.currentPage]);

  useEffect(() => {
    if (isFormStory) {
      // handleGetMyStories();
    }
  }, [isFormStory]);

  useEffect(() => {
    handleExplorePost();
  }, [explorePage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollExplore);

    return () => window.removeEventListener("scroll", handleScrollExplore);
  }, [loadingExplorePost, hasMoreExplorePost]);

  return (
    <div
    // className="object-cover min-h-screen bg-center"
    // style={{
    //   backgroundImage:
    //     "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQHUlzTwr5iUkqUPitO1eTLPM7m8Np5GDgw&s')",
    // }}
    >
      <Header auth={auth} color="dark" />

      <Story
        auth={auth}
        allStories={allStories}
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
        setAllStoriesPage={setAllStoriesPage}
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
        errorCrudPost={errorCrudPost}
        loadingCrudPost={loadingCrudPost}
        fileCrudPost={fileCrudPost}
        title="Tambah Postingan"
      />

      <Posts explorePost={explorePost} />

      {loadingExplorePost && (
        <p className="text-2xl font-bold tracking-wider text-center text-white">
          Loading...
        </p>
      )}
      {!hasMoreExplorePost && (
        <p className="text-2xl font-bold tracking-wider text-center text-white">
          No more posts
        </p>
      )}
    </div>
  );
};

export default Home;
