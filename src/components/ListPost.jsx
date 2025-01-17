import React, { useEffect } from "react";
import { GoComment } from "react-icons/go";
import { alternativeImageUrlPost, profileBlank } from "../assets";

import Like from "./Like";
import { useComment, useNavigateUser, usePostById } from "../hooks";

const ListPost = ({ explore }) => {
  const { handleNavigate } = useNavigateUser();

  const {
    handleAddComment,
    handleDeleteComment,
    form,
    setForm,
    submitComment,
  } = useComment();

  const { handleGetPostById, totalComment } = usePostById();

  useEffect(() => {
    handleGetPostById(explore?.id);
  }, [submitComment]);

  return (
    <div className="flex flex-col w-full pb-4 mb-8 overflow-hidden border rounded-lg shadow-lg lg:w-1/2 bg-slate-300">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={() => handleNavigate(explore?.user?.id)}
        >
          <img
            src={explore?.user?.profilePictureUrl}
            alt={explore?.user?.id}
            onError={(e) => {
              e.target.src = profileBlank;
            }}
            className="object-cover w-10 h-10 rounded-full"
          />
          <p className="font-bold">{explore?.user?.username}</p>
        </div>
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
        <div className="flex flex-row items-center gap-2">
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
        <p className="px-4 pb-2 text-sm tracking-wide text-slate-500 font-medium hover:text-slate-600 transition-all cursor-pointer">
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
  );
};

export default ListPost;
