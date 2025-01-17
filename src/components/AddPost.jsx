import React from "react";
import { profile } from "../assets";
import Modal from "./Modal";
import ModalCreateUpdatePost from "./ModalCreateUpdatePost";

const AddPost = ({
  auth,
  closeModalCreatePost,
  isModalCreatePostOpen,
  openModalCreatePost,
  handleCreatePost,
  form,
  handleFileChange,
  setForm,
  error,
  success,
  loading,
}) => {
  const { user } = auth;

  return (
    <>
      <section className="mt-24 mb-10">
        <div className="flex flex-col items-center w-full px-6 mx-auto lg:px-12 max-w-7xl">
          <div className="flex flex-col w-full p-4 overflow-hidden border rounded-lg shadow-lg lg:w-1/2 bg-white">
            <div className="flex flex-row items-center gap-4">
              <img
                src={user?.profilePictureUrl || profile}
                alt=""
                className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
              />
              <button
                className="lg:text-base text-sm h-12 bg-slate-200 w-full text-left px-4 rounded-full text-gray-500 hover:bg-slate-300 transition-all"
                onClick={openModalCreatePost}
              >
                Apa yang Anda pikirkan, {user?.username}?
              </button>
            </div>
          </div>
        </div>
      </section>

      <ModalCreateUpdatePost
        isModalCreatePostOpen={isModalCreatePostOpen}
        closeModalCreatePost={closeModalCreatePost}
        handleCreatePost={handleCreatePost}
        error={error}
        success={success}
        user={user}
        form={form}
        setForm={setForm}
        handleFileChange={handleFileChange}
        loading={loading}
      />
    </>
  );
};

export default AddPost;
