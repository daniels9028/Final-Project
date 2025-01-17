import React, { useEffect, useState } from "react";
import { GoComment } from "react-icons/go";
import { alternativeImageUrlPost, profileBlank } from "../assets";

import Like from "./Like";
import { useComment, useNavigateUser, usePostById } from "../hooks";
import { Modal } from "../components";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";

const ListPost = ({ explore, handleDeletePost }) => {
  const { handleNavigate } = useNavigateUser();

  const { auth } = useAuth();

  const {
    handleAddComment,
    handleDeleteComment,
    form,
    setForm,
    submitComment,
  } = useComment();

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
              className="object-cover w-10 h-10 rounded-full border-2 border-gray-400"
            />
            <p className="font-bold">{explore?.user?.username}</p>
          </div>
          {explore.user.id === auth.user.id && (
            <div className="flex flex-row items-center gap-2">
              <div className="bg-gray-200 p-2 rounded-full hover:bg-orange-400 transition-all cursor-pointer">
                <MdEdit size={20} />
              </div>
              <div
                className="bg-gray-200 p-2 rounded-full hover:bg-red-500 transition-all cursor-pointer"
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
            className="px-4 pb-2 text-sm tracking-wide text-slate-500 font-medium hover:text-slate-600 transition-all cursor-pointer"
            onClick={openModalPost}
          >
            See all {totalComment} comments
          </p>
        )}
        <div className="px-4 py-2">
          <div className="bg-gray-200 border-2 rounded-full outline-none flex flex-row justify-between px-4 focus:border-blue-500">
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
              className="text-gray-600 text-sm tracking-wider font-semibold"
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
              alt={explore?.user?.id}
              className="w-14 h-14 object-cover rounded-full border-2 border-gray-400"
            />
            <div className="flex flex-row items-center gap-2">
              <p className="font-semibold text-lg">{explore?.user?.username}</p>
              <p>{explore?.caption}</p>
            </div>
          </div>
          <div className="border-y-2 border-gray-200 shadow-md py-10">
            <img
              src={explore?.imageUrl}
              alt={explore?.id}
              className="w-full object-cover h-[300px] "
            />
          </div>
          <div className="flex flex-col justify-center gap-4 px-4 py-2 border-gray-300 ">
            {comments?.map((comment) => (
              <div
                className="flex flex-row items-center gap-4 justify-between"
                key={comment?.id}
              >
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={comment?.user?.profilePictureUrl}
                    alt={comment?.user?.id}
                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-400"
                  />
                  <p className="font-medium text-lg tracking-wide">
                    {comment?.user?.username}
                  </p>
                  <p className="text-base text-gray-800 tracking-wider">
                    {comment?.comment}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-500"
                  onClick={() => handleDeleteComment(comment?.id)}
                >
                  <FaRegTrashAlt />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListPost;
