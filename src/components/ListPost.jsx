import React, { useEffect } from "react";
import { GoComment } from "react-icons/go";
import { alternativeImageUrlPost, profileBlank } from "../assets";

import Like from "./Like";

const ListPost = ({ explore }) => {
  return (
    <div className="flex flex-col w-1/2 pb-4 mb-8 overflow-hidden border rounded-lg shadow-lg bg-slate-300">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <div className="flex flex-row items-center gap-2">
          <img
            src={explore?.user?.profilePictureUrl}
            alt={explore?.user?.id}
            onError={(e) => {
              e.target.src = profileBlank;
            }}
            className="object-cover w-10 h-10 rounded-full"
          />
          <p className="font-bold cursor-pointer">{explore?.user?.username}</p>
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
        <GoComment size={28} />
      </div>
      <p className="px-4 py-2">
        <span className="font-bold cursor-pointer">
          {explore?.user?.username}
        </span>{" "}
        {explore?.caption}
      </p>
      <div className="px-4 py-2">
        <input
          type="text"
          className="w-full h-10 px-2 bg-gray-200 border-2 rounded-full outline-none focus:border-blue-500"
          placeholder="Write a comment"
        />
      </div>
    </div>
  );
};

export default ListPost;
