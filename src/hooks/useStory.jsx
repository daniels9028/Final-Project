import React, { useState } from "react";
import {
  getMyStories,
  getMyFollowingStories,
  createStory,
} from "../services/Story";

const useStory = () => {
  const [allStories, setAllStories] = useState([]);

  const [allStoriesPage, setAllStoriesPage] = useState({
    currentPage: 1,
  });

  const [myStory, setMyStory] = useState([]);

  const [myStoryPage, setMyStoryPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [myFollowingStories, setMyFollowingStories] = useState([]);

  const [myFollowingStoriesPage, setMyFollowingStoriesPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [errorFormStory, setErrorFormStory] = useState({});
  const [successFormStory, setSuccessFormStory] = useState("");
  const [loadingFormStory, setLoadingFormStory] = useState(false);

  const [isModalFormStoryOpen, setModalFormStoryOpen] = useState(false);

  // When create reload page
  const [isFormStory, setIsFormStory] = useState(false);

  const [selectedStory, setSelectedStory] = useState(null);

  const handleSelectStory = (story) => {
    setSelectedStory(story);
  };

  const openModalFormStory = () => {
    setModalFormStoryOpen(true);
    setErrorFormStory({});
    setSuccessFormStory("");
  };
  const closeModalFormStory = () => {
    setModalFormStoryOpen(false);
    setErrorFormStory({});
    setSuccessFormStory("");
  };

  const [formStory, setFormStory] = useState({
    caption: "",
    file: null,
  });

  const handleChangeFormStory = (e) => {
    setFormStory({
      ...formStory,
      [e.target.name]:
        e.target.name == "caption" ? e.target.value : e.target.files[0],
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formStory.caption.trim()) {
      newErrors.caption = "Caption is required.";
    }

    if (!formStory.file) {
      newErrors.file = "Image is required.";
    }

    return newErrors;
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrorFormStory(validationErrors);
      return;
    }

    setIsFormStory(false);
    try {
      setErrorFormStory({});
      setSuccessFormStory("");
      setLoadingFormStory(true);

      await createStory({ ...formStory });

      setSuccessFormStory("Post created was successfully");

      setTimeout(() => {
        closeModalFormStory();
      }, 1000);

      setFormStory({ caption: "", file: null });
      setIsFormStory(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFormStory(false);
    }
  };

  const handleGetMyStories = async () => {
    try {
      const { data } = await getMyStories({ size: 10, page: 1 });

      console.log("mystories", data.stories);
      setMyStory(data.stories);
      setMyStoryPage({
        ...myStory,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMyFollowingStories = async () => {
    try {
      const { data } = await getMyFollowingStories({ size: 10, page: 1 });

      console.log("myfollowingstories", data.stories);
      setMyFollowingStories(data.stories);
      setMyFollowingStoriesPage({
        ...myFollowingStories,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllStories = async () => {
    try {
      const { data: myStories } = await getMyStories({
        size: 10,
        page: allStoriesPage.currentPage,
      });

      const { data: myFollowingStories } = await getMyFollowingStories({
        size: 10,
        page: allStoriesPage.currentPage,
      });

      // console.log("mystories", myStories.stories);
      // console.log("myfollowingstories", myFollowingStories.stories);

      setAllStories((prev) => [
        ...prev,
        ...myStories.stories,
        ...myFollowingStories.stories,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
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
  };
};

export default useStory;
