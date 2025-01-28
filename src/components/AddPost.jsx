import React from "react";
import { profile } from "../assets";
import Modal from "./Modal";
import ModalCreateUpdatePost from "./ModalCreateUpdatePost";

const AddPost = ({
  auth,
  closeModalCrudPost,
  isModalCrudPostOpen,
  openModalCrudPost,
  handleCreatePost,
  formCrudPost,
  handleFileChangeCrudPost,
  handleChangeCrudPost,
  errorCrudPost,
  successCrudPost,
  loadingCrudPost,
}) => {
  const { user } = auth;

  return (
    <>
      <section className="my-10">
        <div className="flex items-center justify-center w-full px-6 mx-auto max-w-7xl lg:px-12">
          <div className="w-full p-4 overflow-hidden bg-white border shadow-xl lg:w-1/2 rounded-xl">
            <div className="flex flex-row items-center justify-center gap-4">
              <img
                src={user?.profilePictureUrl || profile}
                alt={user?.id}
                className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
              />
              <button
                className="w-full h-12 px-4 text-xs text-left text-gray-500 transition-all rounded-full bg-slate-200 hover:bg-slate-300 lg:text-base"
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
        closeModalCrudPost={closeModalCrudPost}
        handleCreatePost={handleCreatePost}
        errorCrudPost={errorCrudPost}
        successCrudPost={successCrudPost}
        user={user}
        formCrudPost={formCrudPost}
        handleChangeCrudPost={handleChangeCrudPost}
        handleFileChangeCrudPost={handleFileChangeCrudPost}
        loadingCrudPost={loadingCrudPost}
        title="Buat Postingan"
      />
    </>
  );
};

export default AddPost;
