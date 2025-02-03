import React from "react";
import Modal from "./Modal";

const ModalCreateUpdatePost = ({
  isModalCrudPostOpen,
  closeModalCrudPost,
  handleCreatePost,
  handleUpdatePost,
  errorCrudPost,
  user,
  formCrudPost,
  handleChangeCrudPost,
  handleFileChangeCrudPost,
  loadingCrudPost,
  selectedPost,
  fileCrudPost,
  title,
}) => {
  return (
    <Modal isOpen={isModalCrudPostOpen} onClose={closeModalCrudPost}>
      <form
        className="flex flex-col p-4 space-y-4 transition-all bg-white rounded-xl shadow-lg border"
        onSubmit={(e) =>
          title === "Edit Postingan"
            ? handleUpdatePost(e, selectedPost.id)
            : handleCreatePost(e)
        }
      >
        <div className="w-full">
          <textarea
            type="text"
            name="caption"
            className="block w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={`Apa yang Anda pikirkan, ${user?.username}?`}
            rows="8"
            value={
              formCrudPost?.caption === ""
                ? selectedPost?.caption
                : formCrudPost?.caption
            }
            onChange={handleChangeCrudPost}
          ></textarea>
          {errorCrudPost?.caption && (
            <p className="mt-1 text-sm text-red-500">
              {errorCrudPost?.caption}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            type="file"
            name="profilePictureUrl"
            className="flex items-center justify-center w-full px-4 py-2 mt-1 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleFileChangeCrudPost}
          />
          {errorCrudPost?.imageUrl && (
            <p className="mt-1 text-sm text-red-500">
              {errorCrudPost?.imageUrl}
            </p>
          )}
          {fileCrudPost ? (
            <div className="relative">
              <img
                src={fileCrudPost}
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
          disabled={loadingCrudPost}
          className="w-full py-2 font-semibold tracking-wide text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {loadingCrudPost ? "Loading..." : "Post"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateUpdatePost;
