import React from "react";
import Modal from "./Modal";

const ModalCreateUpdatePost = ({
  isModalCreatePostOpen,
  closeModalCreatePost,
  handleCreatePost,
  error,
  success,
  user,
  form,
  setForm,
  handleFileChange,
  loading,
}) => {
  return (
    <Modal
      isOpen={isModalCreatePostOpen}
      onClose={closeModalCreatePost}
      title="Buat Postingan"
    >
      <form
        className="space-y-4 p-4 flex flex-col transition-all"
        onSubmit={handleCreatePost}
      >
        {error.message && (
          <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-red-500 rounded-lg">
            {error.message}
          </p>
        )}

        {success && (
          <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-green-500 rounded-lg">
            {success}
          </p>
        )}
        <div className="w-full">
          <textarea
            type="text"
            name="caption"
            className="block w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={`Apa yang Anda pikirkan, ${user?.username}?`}
            rows="8"
            value={form?.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
          ></textarea>
          {error.caption && (
            <p className="text-sm text-red-500 mt-1">{error.caption}</p>
          )}
        </div>
        <div className="w-full">
          <div className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer h-20 flex items-center justify-center">
            <input
              type="file"
              name="imageUrl"
              className="cursor-pointer"
              onChange={handleFileChange}
            ></input>
          </div>
          {error.imageUrl && (
            <p className="text-sm text-red-500 mt-1">{error.imageUrl}</p>
          )}
        </div>
        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white font-semibold tracking-wide py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          {loading ? "Loading..." : "Post"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateUpdatePost;
