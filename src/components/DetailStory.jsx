import React from "react";
import { alternativeImageUrlPost } from "../assets";

const DetailStory = ({ stories }) => {
  const { id, imageUrl } = stories;
  return (
    <div className="min-w-[150px] min-h-[200px] shadow-lg border rounded-lg bg-white flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden">
      <img
        src={imageUrl}
        onError={(e) => {
          e.target.src = alternativeImageUrlPost;
        }}
        alt={id}
        className="object-cover min-h-[200px]"
      />
    </div>
  );
};

export default DetailStory;
