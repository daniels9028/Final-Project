import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { alternativeProfile } from "../assets";

const ListComment = ({
  comments,
  auth,
  handleNavigate,
  handleDeleteComment,
}) => {
  const { user, comment } = comments;
  const { id, profilePictureUrl, username } = user;

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-4">
        <img
          src={profilePictureUrl || alternativeProfile}
          alt={id}
          onError={(e) => {
            e.target.src = alternativeProfile;
          }}
          className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full cursor-pointer"
          onClick={() => handleNavigate(id)}
        />
        <div>
          <p
            className="font-medium tracking-wide cursor-pointer"
            onClick={() => handleNavigate(id)}
          >
            {username}
          </p>
          <p className="text-sm tracking-wider text-gray-800 text-wrap">
            {comment}
          </p>
        </div>
      </div>
      {id === auth?.user?.id && (
        <div
          className="flex items-center justify-center w-8 h-8 p-2 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-red-500"
          onClick={() => handleDeleteComment(comments?.id)}
        >
          <FaRegTrashAlt />
        </div>
      )}
    </div>
  );
};

export default ListComment;
