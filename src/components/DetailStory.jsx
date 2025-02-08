import React from "react";
import { alternativeImageUrlPost } from "../assets";

const DetailStory = ({ stories }) => {
  const { id, imageUrl, user } = stories;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-[90px] h-[90px] border-2 border-blue-400 rounded-full bg-white flex items-center justify-center cursor-pointer overflow-hidden">
          <img
            src={imageUrl || alternativeImageUrlPost}
            onError={(e) => {
              e.target.src = alternativeImageUrlPost;
            }}
            alt={id}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-sm tracking-wider text-black">{user?.username}</p>
      </div>
    </>
  );
};

export default DetailStory;
