import React, { useEffect } from "react";
import { GoComment } from "react-icons/go";
import { alternativeImageUrlPost, profileBlank } from "../assets";

import Like from "./Like";
import { useComment, useNavigateUser, usePostById } from "../hooks";
import { Modal, ModalCreateUpdatePost } from "../components";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";

const ListPost = ({
  explore,
  handleDeletePost,
  formCrudPost,
  handleChangeCrudPost,
  handleUpdatePost,
  errorCrudPost,
  successCrudPost,
  loadingCrudPost,
  fileCrudPost,
  handleFileChangeCrudPost,
  isModalCrudPostOpen,
  openModalCrudPost,
  closeModalCrudPost,
  selectedPost,
  handleSelectPost,
}) => {
  const { handleNavigate } = useNavigateUser();

  const { auth } = useAuth();

  const { user } = auth;

  const {
    handleAddComment,
    handleDeleteComment,
    form,
    setForm,
    submitComment,
  } = useComment();

  // const {
  //   // formCrudPost,
  //   // handleChangeCrudPost,
  //   // errorCrudPost,
  //   // successCrudPost,
  //   // handleFileChangeCrudPost,
  //   // isModalCrudPostOpen,
  //   // openModalCrudPost,
  //   // closeModalCrudPost,
  //   // loadingCrudPost,
  //   // handleUpdatePost,
  //   // fileCrudPost,
  // } = useCrudPost();

  const {
    handleGetPostById,
    totalComment,
    isModalPostOpen,
    openModalPost,
    closeModalPost,
    comments,
  } = usePostById();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddComment(explore?.id);
    }
  };

  useEffect(() => {
    handleGetPostById(explore?.id);
  }, [submitComment]);

  return (
    <>
      <div className="flex flex-col w-full pb-4 mb-8 overflow-hidden border rounded-lg shadow-lg lg:w-1/2 bg-slate-300">
        <div className="flex flex-row items-center justify-between px-4 py-2">
          <div
            className="flex flex-row items-center gap-4 cursor-pointer"
            onClick={() => handleNavigate(explore?.user?.id)}
          >
            <img
              src={explore?.user?.profilePictureUrl}
              alt={explore?.user?.id}
              onError={(e) => {
                e.target.src = profileBlank;
              }}
              className="object-cover w-10 h-10 border-2 border-gray-400 rounded-full"
            />
            <p className="font-bold">{explore?.user?.username}</p>
          </div>
          {explore.user.id === auth.user.id && (
            <div className="flex flex-row items-center gap-2">
              <div
                className="p-2 transition-all bg-gray-200 rounded-full cursor-pointer hover:bg-orange-400"
                onClick={() => {
                  openModalCrudPost();
                  handleSelectPost(explore);
                }}
              >
                <MdEdit size={20} />
              </div>
              <div
                className="p-2 transition-all bg-gray-200 rounded-full cursor-pointer hover:bg-red-500"
                onClick={() => handleDeletePost(explore?.id)}
              >
                <LuTrash size={20} />
              </div>
            </div>
          )}
        </div>
        <img
          src={explore?.imageUrl}
          alt={explore?.id}
          onError={(e) => {
            e.target.src = alternativeImageUrlPost;
          }}
          className="object-cover w-full h-[300px]"
        />
        <div className="flex flex-row items-center gap-6 px-4 py-2">
          <div className="flex flex-row items-center gap-2">
            <Like explore={explore} />
          </div>
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={openModalPost}
          >
            <GoComment size={28} />
            {totalComment !== 0 && (
              <p className="font-bold transition-all">{totalComment}</p>
            )}
          </div>
        </div>
        <p className="px-4 py-2">
          <span
            className="font-bold cursor-pointer"
            onClick={() => handleNavigate(explore?.user?.id)}
          >
            {explore?.user?.username}
          </span>{" "}
          {explore?.caption}
        </p>
        {totalComment !== 0 && (
          <p
            className="px-4 pb-2 text-sm font-medium tracking-wide transition-all cursor-pointer text-slate-500 hover:text-slate-600"
            onClick={openModalPost}
          >
            See all {totalComment} comments
          </p>
        )}
        <div className="px-4 py-2">
          <div className="flex flex-row justify-between px-4 bg-gray-200 border-2 rounded-full outline-none focus:border-blue-500">
            <input
              type="text"
              className="w-full h-10 px-2 bg-gray-200 border-2 rounded-full outline-none"
              placeholder="Write a comment"
              name="comment"
              value={form.comment}
              onKeyDown={handleKeyDown}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
            <button
              className="text-sm font-semibold tracking-wider text-gray-600"
              onClick={() => handleAddComment(explore?.id)}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalPostOpen} onClose={closeModalPost} title="Post">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-row items-center gap-4 px-4 py-2">
            <img
              src={explore?.user?.profilePictureUrl}
              onError={(e) => {
                e.target.src = profileBlank;
              }}
              alt={explore?.user?.id}
              className="object-cover border-2 border-gray-400 rounded-full w-14 h-14"
            />
            <div className="flex flex-row items-center gap-2">
              <p className="text-lg font-semibold">{explore?.user?.username}</p>
              <p>{explore?.caption}</p>
            </div>
          </div>
          <div className="border-gray-200 shadow-lg border-y-2">
            <img
              src={explore?.imageUrl}
              onError={(e) => {
                e.target.src = alternativeImageUrlPost;
              }}
              alt={explore?.id}
              className="w-full object-cover h-[300px] "
            />
          </div>
          <div className="flex flex-col justify-center gap-4 px-4 py-2 border-gray-300 ">
            {comments?.map((comment) => (
              <div
                className="flex flex-row items-center justify-between gap-4"
                key={comment?.id}
              >
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={comment?.user?.profilePictureUrl}
                    alt={comment?.user?.id}
                    className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
                  />
                  <p className="text-lg font-medium tracking-wide">
                    {comment?.user?.username}
                  </p>
                  <p className="text-base tracking-wider text-gray-800">
                    {comment?.comment}
                  </p>
                </div>
                {comment?.user?.id === auth.user.id && (
                  <div
                    className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer hover:bg-gray-500"
                    onClick={() => handleDeleteComment(comment?.id)}
                  >
                    <FaRegTrashAlt />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <ModalCreateUpdatePost
        isModalCrudPostOpen={isModalCrudPostOpen}
        closeModalCrudPost={closeModalCrudPost}
        handleUpdatePost={handleUpdatePost}
        errorCrudPost={errorCrudPost}
        successCrudPost={successCrudPost}
        user={user}
        formCrudPost={formCrudPost}
        handleChangeCrudPost={handleChangeCrudPost}
        handleFileChangeCrudPost={handleFileChangeCrudPost}
        loadingCrudPost={loadingCrudPost}
        fileCrudPost={fileCrudPost}
        selectedPost={selectedPost}
        title="Edit Postingan"
      />
    </>
  );
};

export default ListPost;
