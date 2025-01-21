import React from "react";
import { FaPlus } from "react-icons/fa";
import DetailStory from "./DetailStory";
import ModalFormStory from "./ModalFormStory";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Story = ({
  auth,
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="mt-20">
        <div className="flex items-center justify-center max-w-3xl px-6 mx-auto lg:px-12">
          <div className="flex flex-row items-center w-full gap-4 px-4 py-8 overflow-x-scroll">
            <div
              className="bg-cover bg-center min-w-[150px] min-h-[200px] shadow-lg border-2 border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url(${user?.profilePictureUrl})`,
              }}
            >
              <button
                className="z-10 flex items-center justify-center w-12 h-12 p-2 text-white bg-blue-500 rounded-full shadow-xl"
                onClick={openModalFormStory}
              >
                <FaPlus />
              </button>
            </div>

            {myStory.map((stories) => (
              <DetailStory stories={stories} key={stories.id} />
            ))}

            {myFollowingStories.map((followingStories) => (
              <DetailStory
                stories={followingStories}
                key={followingStories.id}
              />
            ))}
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

export default Story;
