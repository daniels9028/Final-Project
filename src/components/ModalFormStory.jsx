import React from "react";
import Modal from "./Modal";

const ModalFormStory = ({
  isModalFormStoryOpen,
  closeModalFormStory,
  handleCreateStory,
  errorFormStory,
  successFormStory,
  user,
  formStory,
  handleChangeFormStory,
  loadingFormStory,
  selectedStory,
  title,
}) => {
  return (
    <Modal
      isOpen={isModalFormStoryOpen}
      onClose={closeModalFormStory}
      title={title}
    >
      <form
        className="flex flex-col p-4 space-y-4 transition-all bg-white shadow-xl rounded-lg border"
        onSubmit={(e) =>
          title === "Edit Story"
            ? handleUpdatePost(e, selectedPost.id)
            : handleCreateStory(e)
        }
      >
        {errorFormStory?.message && (
          <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-red-500 rounded-lg">
            {errorFormStory?.message}
          </p>
        )}

        {successFormStory && (
          <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-green-500 rounded-lg">
            {successFormStory}
          </p>
        )}
        <div className="w-full">
          <textarea
            type="text"
            name="caption"
            className="block w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={`Apa yang Anda pikirkan, ${user?.username}?`}
            rows="8"
            value={
              formStory?.caption === ""
                ? selectedStory?.caption
                : formStory?.caption
            }
            onChange={handleChangeFormStory}
          ></textarea>
          {errorFormStory?.caption && (
            <p className="mt-1 text-sm text-red-500">
              {errorFormStory?.caption}
            </p>
          )}
        </div>
        <div className="w-full">
          {/* <div className="flex items-center justify-center w-full h-20 mt-1 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <input
              type="file"
              name="file"
              className="cursor-pointer"
              onChange={handleChangeFormStory}
            ></input>
          </div> */}
          <input
            type="file"
            name="file"
            className="flex items-center justify-center w-full px-4 py-2 mt-1 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChangeFormStory}
          />
          {errorFormStory?.file && (
            <p className="mt-1 text-sm text-red-500">{errorFormStory?.file}</p>
          )}
          {formStory.file ? (
            <div className="relative">
              <img
                src={formStory.file}
                alt="Preview"
                className="object-cover w-full rounded-lg shadow-lg h-60"
              />
            </div>
          ) : (
            <p className="text-sm text-center text-gray-500">
              No image selected
            </p>
          )}
        </div>
        <button
          disabled={loadingFormStory}
          className="w-full py-2 font-semibold tracking-wide text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {loadingFormStory ? "loading..." : "Story"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalFormStory;
