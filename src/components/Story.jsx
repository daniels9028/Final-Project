import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import DetailStory from "./DetailStory";
import ModalFormStory from "./ModalFormStory";
import { alternativeImageUrlPost } from "../assets";
import { PauseCircle, PlayCircle } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import {
  deleteStory,
  getStoryById,
  getStoryViewsByStoryId,
} from "../services/Story";

const Story = ({
  auth,
  allStories,
  setAllStories,
  myStory,
  myFollowingStories,
  formStory,
  errorFormStory,
  successFormStory,
  loadingFormStory,
  isModalFormStoryOpen,
  selectedStory,
  handleSelectedStory,
  handleChangeFormStory,
  openModalFormStory,
  closeModalFormStory,
  handleCreateStory,
  setAllStoriesPage,
}) => {
  const { user } = auth;

  return (
    <>
      <section className="">
        <div className="flex items-center justify-center max-w-5xl px-6 mx-auto lg:px-12">
          <div className="flex flex-row items-center w-full">
            <CarouselContainer
              slides={allStories}
              setStories={setAllStories}
              user={user}
              openModalFormStory={openModalFormStory}
              setAllStoriesPage={setAllStoriesPage}
            />
          </div>
        </div>
      </section>

      <ModalFormStory
        isModalFormStoryOpen={isModalFormStoryOpen}
        closeModalFormStory={closeModalFormStory}
        handleCreateStory={handleCreateStory}
        errorFormStory={errorFormStory}
        successFormStory={successFormStory}
        user={user}
        formStory={formStory}
        handleChangeFormStory={handleChangeFormStory}
        loadingFormStory={loadingFormStory}
        selectedStory={selectedStory}
        handleSelectedStory={handleSelectedStory}
        title="Buat Story"
      />
    </>
  );
};

const CarouselContainer = ({
  slides,
  setStories,
  user,
  openModalFormStory,
  setAllStoriesPage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleSlides = screen.width >= 1280 ? 6 : 2; // Number of slides visible at a time
  const nextSlides = screen.width >= 1280 ? 4 : 2;
  const totalSlides = slides.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(0, prevIndex - nextSlides));
    }
  };

  const handleNext = () => {
    if (currentIndex + visibleSlides < totalSlides) {
      setCurrentIndex((prevIndex) =>
        Math.min(totalSlides - visibleSlides, prevIndex + nextSlides)
      );
    } else if (currentIndex + visibleSlides >= totalSlides) {
      setAllStoriesPage((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  // const [showStory, setShowStory] = useState(false);

  const [showStory, setShowStory] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  const handleOpenStory = (storyId) => {
    setSelectedStoryId(storyId);
    setShowStory(true);
  };

  return (
    <div className="relative flex items-center w-full max-w-3xl mx-auto overflow-hidden">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-0 w-8 h-8 p-1 text-gray-600 bg-white rounded-full shadow hover:bg-gray-100 disabled:cursor-not-allowed"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-center justify-center gap-2 mx-6 lg:mx-10">
        <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
          <div
            className="bg-cover bg-center w-[90px] h-[90px] border-2 border-blue-400 rounded-full bg-white flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${user?.profilePictureUrl})`,
            }}
          >
            <button
              className="flex items-center justify-center w-6 h-6 p-2 text-white transition-all bg-blue-500 rounded-full shadow-xl hover:bg-blue-600"
              onClick={openModalFormStory}
            >
              <FaPlus />
            </button>
          </div>
          <p className="text-sm tracking-wider text-black">Add Story</p>
        </div>
        <AnimatePresence>
          {slides
            .slice(currentIndex, currentIndex + visibleSlides)
            .map((slide, index) => (
              <motion.div
                key={`${slide.id}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
                onClick={() => {
                  setShowStory(true);
                  handleOpenStory(slide.id);
                }}
              >
                <DetailStory stories={slide} key={slide.id} />
              </motion.div>
            ))}
        </AnimatePresence>

        {showStory && (
          <StoryViewer
            stories={slides}
            user={user}
            setStories={setStories}
            selectedStoryId={selectedStoryId}
            onClose={() => setShowStory(false)}
          />
        )}
      </div>

      <button
        onClick={handleNext}
        // disabled={currentIndex + visibleSlides >= totalSlides}
        className="absolute right-0 w-8 h-8 p-1 text-gray-600 bg-white rounded-full shadow hover:bg-gray-100 disabled:cursor-not-allowed"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const StoryViewer = ({
  stories,
  selectedStoryId,
  onClose,
  setStories,
  user,
}) => {
  const initialIndex = stories.findIndex(
    (story) => story.id === selectedStoryId
  );
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0
  );

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const [storyInfo, setStoryInfo] = useState([]);
  const [storyViews, setStoryViews] = useState([]);

  const startProgress = () => {
    setProgress(0);

    const newIntervalId = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 30);

    const newTimeoutId = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onClose();
      }
    }, 3000);

    setIntervalId(newIntervalId);
    setTimeoutId(newTimeoutId);
  };

  const pauseProgress = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  const handleImageClick = () => {
    console.log(isPaused);
    setIsPaused((prev) => {
      if (prev) {
        startProgress(); // Resume progress
      } else {
        pauseProgress(); // Pause progress
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (!isPaused) {
      startProgress();
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [currentIndex, onClose]);

  const handleGetStoryById = async (storyId) => {
    try {
      const { data: storyById } = await getStoryById(storyId);

      setStoryInfo(storyById);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStoryViewsById = async (storyId) => {
    try {
      const { data: storyViewsById } = await getStoryViewsByStoryId(storyId);

      setStoryViews(storyViewsById);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      await deleteStory(storyId); // API call to delete story

      // Remove deleted story from state
      setStories((prevStories) =>
        prevStories.filter((story) => story.id !== storyId)
      );

      // If the deleted story was open, close the viewer or move to next
      if (stories.length === 1) {
        onClose();
      } else {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
      }
    } catch (error) {
      console.error("Failed to delete story", error);
    }
  };

  // LOAD STORY VIEW AND GET STORY BY ID
  useEffect(() => {
    handleGetStoryById(stories[currentIndex].id);
    handleGetStoryViewsById(stories[currentIndex].id);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <button
        className="absolute text-xl text-white top-6 right-6"
        onClick={onClose}
      >
        ✖
      </button>
      <div className="relative w-[400px] h-screen flex items-center justify-center">
        {/* Progress Bar */}
        <div className="absolute flex space-x-1 top-2 left-2 right-2">
          {stories.map((_, index) => (
            <motion.div
              key={index}
              className="flex-1 h-1 overflow-hidden bg-gray-500 rounded"
            >
              {index === currentIndex && (
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Story Image */}
        <div className="flex relative flex-col justify-center">
          <motion.img
            key={storyInfo?.id}
            src={storyInfo?.imageUrl || alternativeImageUrlPost}
            onError={(e) => {
              e.target.src = alternativeImageUrlPost;
            }}
            className="w-[330px] h-[300px] object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleImageClick}
          />

          <AnimatePresence>
            {isPaused && (
              <motion.div
                className="absolute flex items-center justify-center bg-black bg-opacity-40 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{
                  top: "40%",
                  left: "40%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <PauseCircle size={60} className="text-white opacity-80" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-row items-center justify-between mt-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-1">
                {storyViews.map((storyView, index) => (
                  <img
                    src={storyView?.user?.profilePictureUrl}
                    alt={storyView?.id}
                    key={storyView?.id}
                    className="w-6 h-6 border rounded-full"
                  />
                ))}
              </div>
              <p className="text-xs text-white">{storyViews.length} dilihat</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="absolute left-0 p-2 transform -translate-y-1/2 bg-white rounded-full top-1/2 bg-opacity-80"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        >
          ◀
        </button>

        <button
          className="absolute right-0 p-2 transform -translate-y-1/2 bg-white rounded-full top-1/2 bg-opacity-80"
          onClick={() => {
            if (currentIndex < stories.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              onClose();
            }
          }}
        >
          ▶
        </button>

        {/* Close Button */}
        {stories[currentIndex].user.id === user.id && (
          <button
            className="absolute top-6 right-6 text-white bg-red-500 rounded-full p-1"
            onClick={() => handleDeleteStory(stories[currentIndex].id)}
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Story;
