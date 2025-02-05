import React, { useState } from "react";
import { alternativeImageUrlPost, profileBlank } from "../assets";
import { GoComment } from "react-icons/go";
import Like from "./Like";
import ListComment from "./ListComment";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";

const DetailPost = ({
  isOpen,
  onClose,
  explore,
  comments,
  auth,
  totalComment,
  form,
  setForm,
  handleKeyDown,
  handleAddComment,
  handleDeleteComment,
  handleNavigate,
  openModalCrudPost,
  handleSelectPost,
  handleDeletePost,
}) => {
  if (!isOpen) return null;

  const { user } = auth;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const variants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute top-4 right-4">
        <button onClick={onClose} className="text-2xl text-white">
          ✖
        </button>
      </div>

      <div className="w-full lg:max-w-3xl max-w-lg overflow-hidden bg-white h-[80vh] rounded-lg shadow-lg mx-4">
        <div className="flex flex-row w-full h-full">
          <div className="hidden w-full border-r lg:w-1/2 lg:flex">
            <img
              src={explore?.imageUrl || alternativeImageUrlPost}
              onError={(e) => {
                e.target.src = alternativeImageUrlPost;
              }}
              alt={explore?.id}
              className="h-full object-cover w-full"
            />
          </div>

          <div className="relative w-full h-full lg:w-1/2">
            <div className="flex flex-row items-center justify-between p-4 space-x-4 border-b">
              <div className="flex flex-row items-center gap-2">
                <img
                  src={explore?.user?.profilePictureUrl || profileBlank}
                  onError={(e) => {
                    e.target.src = profileBlank;
                  }}
                  alt={explore?.user?.id}
                  className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
                />
                <p className="font-medium tracking-wider">
                  {explore?.user?.username}
                </p>
              </div>
              {explore?.user?.id === user?.id && (
                <>
                  <div className="flex flex-row items-center gap-2">
                    <BsThreeDots
                      size={24}
                      className="cursor-pointer"
                      onClick={() => {
                        toggleMenu();
                      }}
                    />
                  </div>
                  <motion.div
                    animate={isMenuOpen ? "open" : "closed"}
                    variants={variants}
                    className="absolute z-40 flex flex-col justify-center gap-4 p-4 text-black transition-all duration-300 bg-white border border-gray-400 rounded-xl right-4 top-14"
                  >
                    <div
                      className="flex flex-row items-center gap-4 p-2 text-sm transition-all bg-orange-500 rounded-full cursor-pointer text-nowrap hover:bg-orange-700"
                      onClick={() => {
                        onClose();
                        openModalCrudPost();
                        handleSelectPost(explore);
                        toggleMenu();
                      }}
                    >
                      <MdEdit size={16} color="white" />
                    </div>
                    <div
                      className="flex flex-row items-center gap-4 p-2 text-sm transition-all bg-red-500 rounded-full cursor-pointer text-nowrap hover:bg-red-700"
                      onClick={() => {
                        handleDeletePost(explore?.id);
                        onClose();
                      }}
                    >
                      <LuTrash size={16} color="white" />
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            <div className="h-full overflow-y-auto no-scrollbar">
              <img
                src={explore?.imageUrl || alternativeImageUrlPost}
                onError={(e) => {
                  e.target.src = alternativeImageUrlPost;
                }}
                alt={explore?.id}
                className="block h-[300px] w-full p-0 object-cover lg:hidden"
              />
              <div className="flex flex-row items-center p-4 space-x-4">
                <img
                  src={explore?.user?.profilePictureUrl || profileBlank}
                  onError={(e) => {
                    e.target.src = profileBlank;
                  }}
                  alt={explore?.user?.id}
                  onClick={() => handleNavigate(explore?.user?.id)}
                  className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full cursor-pointer"
                />
                <div className="flex flex-col justify-center flex-1">
                  <p className="font-medium tracking-wider text-wrap">
                    <span
                      className="cursor-pointer"
                      onClick={() => handleNavigate(explore?.user?.id)}
                    >
                      {explore?.user?.username}
                    </span>{" "}
                    <span className="font-light">{explore?.caption}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 mt-10 mb-48 space-y-6 lg:mb-48">
                {comments?.map((comment) => (
                  <ListComment
                    comments={comment}
                    key={comment?.id}
                    auth={auth}
                    handleNavigate={handleNavigate}
                    handleDeleteComment={handleDeleteComment}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-50 w-full p-4 bg-white border-t shadow-lg">
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <Like explore={explore} />
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <FaRegComment size={28} />
                  {totalComment !== 0 && (
                    <p className="font-bold transition-all">{totalComment}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center w-full gap-4 mt-4">
                <img
                  src={user?.profilePictureUrl}
                  alt={user?.id}
                  onError={(e) => {
                    e.target.src = profileBlank;
                  }}
                  className="object-cover w-10 h-10 border-2 border-gray-400 rounded-full"
                />
                <div className="flex flex-row justify-between flex-1 w-full px-2 bg-gray-200 border-2 rounded-full outline-none flex-nowrap focus:border-blue-500">
                  <input
                    type="text"
                    className="w-full h-10 px-2 text-sm bg-gray-200 border-2 rounded-full outline-none"
                    placeholder="Tambahkan komentar..."
                    name="comment"
                    value={form.comment}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                  />
                  <button
                    className="text-sm font-bold tracking-wider text-gray-600"
                    onClick={() => handleAddComment(explore?.id)}
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
