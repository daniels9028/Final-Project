import React, { useState } from "react";
import {
  getMyStories,
  getMyFollowingStories,
  createStory,
} from "../services/Story";
import { uploadImage } from "../services/Upload";
import Swal from "sweetalert2";

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

  const handleChangeFormStory = async (e) => {
    if (e.target.name === "file") {
      try {
        const { url } = await uploadImage(e.target.files[0]);

        setFormStory({
          ...formStory,
          file: url,
        });
      } catch (error) {
        Swal.fire({
          title: "Peringatan",
          text:
            error.code === "ERR_NETWORK" ? "File terlalu besar" : error.message,
          icon: "error",
        });
      }
    } else {
      setFormStory({
        ...formStory,
        [e.target.name]: e.target.value,
      });
    }
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

      await createStory({ ...formStory, imageUrl: formStory.file });

      Swal.fire({
        title: "Berhasil",
        text: "Story berhasil ditambahkan!",
        icon: "success",
      });

      setTimeout(() => {
        closeModalFormStory();
      }, 1000);

      handleGetAllStories(true);

      setFormStory({ caption: "", file: null });
      setIsFormStory(true);
    } catch (error) {
      Swal.fire({
        title: "Peringatan",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoadingFormStory(false);
    }
  };

  const handleGetMyStories = async () => {
    try {
      const { data } = await getMyStories({ size: 10, page: 1 });

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

  const handleGetAllStories = async (resetPage = false) => {
    try {
      if (resetPage) {
        setAllStories([]); // Clear old stories
        setAllStoriesPage({ currentPage: 1 }); // Reset page to 1
      }

      const { data: myStories } = await getMyStories({
        size: 10,
        page: resetPage ? 1 : allStoriesPage.currentPage,
      });

      const { data: myFollowingStories } = await getMyFollowingStories({
        size: 10,
        page: resetPage ? 1 : allStoriesPage.currentPage,
      });

      setAllStories((prev) => {
        const combinedStories = [
          ...(resetPage ? [] : prev), // Clear old stories if resetting
          ...myStories.stories,
          ...myFollowingStories.stories,
        ];

        // ✅ Remove duplicate stories by ID
        const uniqueStories = combinedStories.reduce((acc, current) => {
          if (!acc.some((story) => story.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);

        return uniqueStories;
      });
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
    allStoriesPage,
    setAllStoriesPage,
    setAllStories,
  };
};

export default useStory;
