import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { AddPost, Navbar, Posts } from "../../components/index";
import useExplorePost from "../../hooks/useExplorePost";
import { useCrudPost } from "../../hooks";

const Home = () => {
  const { auth } = useAuth();

  const { handleExplorePost, explorePost, explorePage } = useExplorePost();

  const {
    form,
    handleFileChange,
    setForm,
    handleCreatePost,
    error,
    success,
    isModalPostOpen,
    openModalPost,
    closeModalPost,
    loading,
  } = useCrudPost();

  useEffect(() => {
    handleExplorePost();
    document.title = "Home | Instagram";
  }, []);

  return (
    <div>
      <Navbar auth={auth} />
      <AddPost
        auth={auth}
        isModalPostOpen={isModalPostOpen}
        closeModalPost={closeModalPost}
        openModalPost={openModalPost}
        form={form}
        handleFileChange={handleFileChange}
        setForm={setForm}
        handleCreatePost={handleCreatePost}
        success={success}
        error={error}
        loading={loading}
      />
      <Posts explorePost={explorePost} explorePage={explorePage} />
    </div>
  );
};

export default Home;
