import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import DetailStory from "./DetailStory";
import ModalFormStory from "./ModalFormStory";

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
}) => {
  const { user } = auth;

  const slides = [
    "Slide 1 Content",
    "Slide 2 Content",
    "Slide 3 Content",
    "Slide 4 Content",
    "Slide 5 Content",
    "Slide 6 Content",
    "Slide 6 Content",
    "Slide 6 Content",
    "Slide 6 Content",
    "Slide 6 Content",
    "Slide 6 Content",
  ];

  return (
    <>
      <section className="">
        <div className="flex items-center justify-center max-w-5xl px-6 mx-auto lg:px-12">
          <div className="flex flex-row items-center w-full">
            {/* <div className="flex flex-col items-center justify-center gap-2">
              <div
                className="bg-cover bg-center min-w-[100px] min-h-[100px] border-2 border-blue-400 rounded-full bg-white flex flex-col items-center justify-center"
                style={{
                  backgroundImage: `url(${user?.profilePictureUrl})`,
                }}
              >
                <button
                  className="flex items-center justify-center w-8 h-8 p-2 text-white transition-all bg-blue-500 rounded-full shadow-xl hover:bg-blue-600"
                  onClick={openModalFormStory}
                >
                  <FaPlus />
                </button>
              </div>
              <p className="text-sm tracking-wider text-black">Add Story</p>
            </div> */}

            {/* {allStories.map((stories) => (
              <DetailStory stories={stories} key={stories.id} />
            ))} */}
            <CarouselContainer
              slides={allStories}
              user={user}
              openModalFormStory={openModalFormStory}
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

const CarouselContainer = ({ slides, user, openModalFormStory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleSlides = screen.width >= 1280 ? 6 : 2; // Number of slides visible at a time
  const nextSlides = screen.width >= 1280 ? 4 : 2;
  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - visibleSlides : prevIndex - nextSlides
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleSlides >= totalSlides ? 0 : prevIndex + nextSlides
    );
  };

  return (
    <div className="relative flex items-center w-full max-w-3xl mx-auto overflow-hidden">
      <button
        onClick={handlePrev}
        className="absolute left-0 w-8 h-8 p-1 text-gray-600 bg-white rounded-full shadow hover:bg-gray-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-center justify-center gap-2 mx-8">
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
              >
                <DetailStory stories={slide} key={slide.id} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 w-8 h-8 p-1 text-gray-600 bg-white rounded-full shadow hover:bg-gray-100"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Story;
