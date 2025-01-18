import React from "react";
import Modal from "./Modal";

const ModalCreateUpdatePost = ({
  isModalCrudPostOpen,
  closeModalCrudPost,
  handleCreatePost,
  errorCrudPost,
  successCrudPost,
  user,
  formCrudPost,
  setFormCrudPost,
  handleFileChangeCrudPost,
  loadingCrudPost,
  title,
}) => {
  return (
    <Modal
      isOpen={isModalCrudPostOpen}
      onClose={closeModalCrudPost}
      title={title}
    >
      <form
        className="flex flex-col p-4 space-y-4 transition-all"
        onSubmit={handleCreatePost}
      >
        {errorCrudPost.message && (
          <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-red-500 rounded-lg">
            {errorCrudPost.message}
          </p>
        )}

        {successCrudPost && (
          <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-green-500 rounded-lg">
            {successCrudPost}
          </p>
        )}
        <div className="w-full">
          <textarea
            type="text"
            name="caption"
            className="block w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={`Apa yang Anda pikirkan, ${user?.username}?`}
            rows="8"
            value={formCrudPost?.caption}
            onChange={(e) =>
              setFormCrudPost({ ...formCrudPost, caption: e.target.value })
            }
          ></textarea>
          {errorCrudPost.caption && (
            <p className="mt-1 text-sm text-red-500">{errorCrudPost.caption}</p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center justify-center w-full h-20 mt-1 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <input
              type="file"
              name="imageUrl"
              className="cursor-pointer"
              onChange={handleFileChangeCrudPost}
            ></input>
          </div>
          {errorCrudPost.imageUrl && (
            <p className="mt-1 text-sm text-red-500">
              {errorCrudPost.imageUrl}
            </p>
          )}
        </div>
        <button
          disabled={loadingCrudPost}
          className="w-full py-2 font-semibold tracking-wide text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {loadingCrudPost ? "loading..." : "Post"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateUpdatePost;
