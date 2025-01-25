import React from "react";
import { useAuth } from "../context/AuthContext";
import { profileBlank } from "../assets";

const ListFollowers = ({ follower, handleNavigate, id }) => {
  const { auth } = useAuth();

  console.log(follower.profilePictureUrl);
  return (
    <div
      key={follower.id}
      className="flex flex-row items-center justify-between px-4 py-2 mb-4"
    >
      <div className="flex flex-row items-center gap-4">
        <img
          src={follower?.profilePictureUrl || profileBlank}
          alt={follower?.id}
          onError={(e) => {
            e.target.src = profileBlank;
          }}
          className="object-cover w-12 h-12 border-2 rounded-full cursor-pointer"
          onClick={() => handleNavigate(follower?.id)}
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
        <button className="px-4 py-2 font-semibold transition-all bg-gray-200 rounded-lg hover:bg-gray-400">
          Diikuti
        </button>
      )}
    </div>
  );
};

export default ListFollowers;
