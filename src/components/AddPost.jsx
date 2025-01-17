import React from "react";
import { profile } from "../assets";
import Modal from "./Modal";
import ModalCreateUpdatePost from "./ModalCreateUpdatePost";

const AddPost = ({
  auth,
  closeModalCreatePost,
  isModalCrudPostOpen,
  openModalCrudPost,
  handleCreatePost,
  formCrudPost,
  handleFileChangeCrudPost,
  setFormCrudPost,
  errorCrudPost,
  successCrudPost,
  loadingCrudPost,
}) => {
  const { user } = auth;

  return (
    <>
      <section className="mt-24 mb-10">
        <div className="flex flex-col items-center w-full px-6 mx-auto lg:px-12 max-w-7xl">
          <div className="flex flex-col w-full p-4 overflow-hidden bg-white border rounded-lg shadow-lg lg:w-1/2">
            <div className="flex flex-row items-center gap-4">
              <img
                src={user?.profilePictureUrl || profile}
                alt=""
                className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
              />
              <button
                className="w-full h-12 px-4 text-sm text-left text-gray-500 transition-all rounded-full lg:text-base bg-slate-200 hover:bg-slate-300"
                onClick={openModalCrudPost}
              >
                Apa yang Anda pikirkan, {user?.username}?
              </button>
            </div>
          </div>
        </div>
      </section>

      <ModalCreateUpdatePost
        isModalCrudPostOpen={isModalCrudPostOpen}
        closeModalCreatePost={closeModalCreatePost}
        handleCreatePost={handleCreatePost}
        errorCrudPost={errorCrudPost}
        successCrudPost={successCrudPost}
        user={user}
        formCrudPost={formCrudPost}
        setFormCrudPost={setFormCrudPost}
        handleFileChangeCrudPost={handleFileChangeCrudPost}
        loadingCrudPost={loadingCrudPost}
      />
    </>
  );
};

export default AddPost;
