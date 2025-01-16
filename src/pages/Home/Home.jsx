import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  createPost,
  deletePost,
  getExplorePost,
  getMyFollowingPost,
  getPostById,
  getPostByUserId,
  updatePost,
} from "../../services/Post";

import { Navbar, Posts } from "../../components/index";

const Home = () => {
  const { auth } = useAuth();

  const [explorePost, setExplorePost] = useState([]);

  const [explorePage, setExplorePage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    caption: "Pengen ayam",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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

  const create = async () => {
    try {
      const data = await createPost({ ...form, file });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    try {
      const data = await updatePost(
        { ...form, file },
        "763d2432-12fa-43e5-960e-7d0640d095a1"
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const destroyPost = async () => {
    try {
      const data = await deletePost("763d2432-12fa-43e5-960e-7d0640d095a1");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleExplorePost();
    // postById();
    // followingPost();
    // getProfileData();
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
