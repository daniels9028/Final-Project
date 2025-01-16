import React from "react";
import { useAuth } from "../context/AuthContext";
import { profileBlank } from "../assets";

const ListFollowers = ({ follower, handleNavigate, id }) => {
  const { auth } = useAuth();
  return (
    <div
      key={follower.id}
      className="flex flex-row items-center justify-between mb-4"
    >
      <div className="flex flex-row items-center gap-4">
        <img
          src={follower?.profilePictureUrl}
          alt={follower?.id}
          className="object-cover w-10 h-10 rounded-full cursor-pointer"
          onClick={() => handleNavigate(follower?.id)}
          onError={(e) => {
            e.target.src = profileBlank;
          }}
        />
        <div className="flex flex-col justify-center">
          <p
            className="font-semibold tracking-wide cursor-pointer"
            onClick={() => handleNavigate(follower?.id)}
          >
            {follower?.username}
          </p>
          <p className="font-semibold tracking-wide text-slate-500">
            {follower?.email}
          </p>
        </div>
      </div>
      {id === auth.user.id && (
        <button className="px-4 py-2 font-semibold bg-gray-200 rounded-lg">
          Diikuti
        </button>
      )}
    </div>
  );
};

export default ListFollowers;
