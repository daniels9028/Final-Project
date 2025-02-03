import React, { useEffect, useState } from "react";
import { GoComment } from "react-icons/go";
import { alternativeImageUrlPost, profile, profileBlank } from "../assets";

import Like from "./Like";
import { useComment, useNavigateUser, usePostById } from "../hooks";
import { DetailPost, Modal, ModalCreateUpdatePost } from "../components";
import { FaRegComment } from "react-icons/fa";

import { MdEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const variants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: 0,
    },
  };

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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full px-4 mb-8 overflow-hidden bg-white border shadow-lg lg:w-1/2 rounded-xl"
      >
        <div className="relative flex flex-row items-center justify-between py-3">
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
            <div>
              <p className="font-semibold tracking-wider text-[15px]">
                {explore?.user?.username}
              </p>
              <p className="text-[13px] font-semibold tracking-wider text-gray-500">
                Pontianak, Indonesia
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <BsThreeDots
              size={24}
              className="cursor-pointer"
              onClick={toggleMenu}
            />
          </div>

          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            variants={variants}
            className="absolute z-40 flex flex-col justify-center gap-4 p-4 text-black transition-all duration-300 bg-white border border-gray-400 rounded-xl right-4 top-14"
          >
            {explore.user.id === auth.user.id && (
              <>
                <div
                  className="flex flex-row items-center gap-4 p-2 text-sm transition-all bg-gray-200 rounded-full cursor-pointer text-nowrap hover:bg-gray-400"
                  onClick={() => {
                    openModalCrudPost();
                    handleSelectPost(explore);
                    toggleMenu();
                  }}
                >
                  <MdEdit size={16} />
                </div>
                <div
                  className="flex flex-row items-center gap-4 p-2 text-sm transition-all bg-gray-200 rounded-full cursor-pointer text-nowrap hover:bg-gray-400"
                  onClick={() => handleDeletePost(explore?.id)}
                >
                  <LuTrash size={16} />
                </div>
              </>
            )}
          </motion.div>
        </div>

        <img
          src={explore?.imageUrl}
          alt={explore?.id}
          onError={(e) => {
            e.target.src = alternativeImageUrlPost;
          }}
          className="object-cover w-full h-[300px] rounded-xl border-2 border-slate-100"
        />

        <div className="flex flex-row items-center gap-6 py-3">
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <Like explore={explore} />
          </div>
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={openModalPost}
          >
            <FaRegComment size={28} />
            {totalComment !== 0 && (
              <p className="font-bold transition-all">{totalComment}</p>
            )}
          </div>
        </div>

        <p className="py-2 tracking-wider">
          <span
            className="font-semibold tracking-widest cursor-pointer"
            onClick={() => handleNavigate(explore?.user?.id)}
          >
            {explore?.user?.username}
          </span>{" "}
          {explore?.caption}
        </p>

        {totalComment !== 0 && (
          <p
            className="pb-2 text-sm font-medium tracking-wide transition-all cursor-pointer text-slate-500 hover:text-slate-600"
            onClick={openModalPost}
          >
            See all {totalComment} comments
          </p>
        )}

        <div className="flex flex-row items-center w-full gap-3 pt-4 pb-8">
          <img
            src={user?.profilePictureUrl || profile}
            alt={user?.id}
            onError={(e) => {
              e.target.src = profile;
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
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
            <button
              className="text-sm font-bold tracking-wider text-gray-600"
              onClick={() => handleAddComment(explore?.id)}
            >
              Kirim
            </button>
          </div>
        </div>
      </motion.div>

      <DetailPost
        isOpen={isModalPostOpen}
        onClose={closeModalPost}
        explore={explore}
        comments={comments}
        auth={auth}
        totalComment={totalComment}
        form={form}
        setForm={setForm}
        handleKeyDown={handleKeyDown}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        handleNavigate={handleNavigate}
      />

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
