import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import DetailStory from "./DetailStory";
import ModalFormStory from "./ModalFormStory";
import { alternativeImageUrlPost } from "../assets";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Story = ({
  auth,
  allStories,
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

  const [showStory, setShowStory] = useState(false);

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
                onClick={() => setShowStory(true)}
              >
                <DetailStory stories={slide} key={slide.id} />
              </motion.div>
            ))}
        </AnimatePresence>

        {showStory && (
          <StoryViewer stories={slides} onClose={() => setShowStory(false)} />
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

const StoryViewer = ({ stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 30); // Update progress every 30ms

    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onClose();
      }
    }, 5000); // Auto-next story in 3 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentIndex, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-[400px] h-screen flex items-center justify-center">
        {/* Progress Bar */}
        <div className="absolute top-2 left-2 right-2 flex space-x-1">
          {stories.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 bg-gray-500 flex-1 rounded overflow-hidden"
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
        <div className="flex flex-col justify-center">
          <motion.img
            key={stories[currentIndex].id}
            src={stories[currentIndex].imageUrl || alternativeImageUrlPost}
            onError={(e) => {
              e.target.src = alternativeImageUrlPost;
            }}
            className="w-[330px] h-[300px] object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p className="p-1 mix-blend-normal text-xs text-white">
            {stories[currentIndex].totalViews} kali dilihat
          </p>
        </div>

        {/* Controls */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        >
          ◀
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full"
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
        <button
          className="absolute top-6 right-2 text-white text-xl"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Story;
