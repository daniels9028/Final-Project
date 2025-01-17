import React from "react";
import { useAuth } from "../context/AuthContext";
import { profileBlank } from "../assets";
import { useFollow } from "../hooks";

const ListFollowing = ({ follow, handleNavigate, id, handleUnFollow }) => {
  const { auth } = useAuth();

  return (
    <div
      key={follow.id}
      className="flex flex-row items-center justify-between mb-4 px-4 py-2"
    >
      <div className="flex flex-row items-center gap-4">
        <img
          src={follow?.profilePictureUrl}
          alt={follow?.id}
          className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full cursor-pointer"
          onClick={() => handleNavigate(follow?.id)}
          onError={(e) => {
            e.target.src = profileBlank;
          }}
        />
        <div className="flex flex-col justify-center">
          <p
            className="font-semibold tracking-wide cursor-pointer"
            onClick={() => handleNavigate(follow?.id)}
          >
            {follow?.username}
          </p>
          <p className="font-semibold tracking-wide text-slate-500">
            {follow?.email}
          </p>
        </div>
      </div>
      {id === auth.user.id && (
        <button
          className="px-4 py-2 font-semibold bg-gray-200 rounded-lg"
          onClick={() => handleUnFollow(follow.id)}
        >
          Hapus
        </button>
      )}
    </div>
  );
};

export default ListFollowing;
