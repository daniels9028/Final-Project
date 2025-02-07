import React from "react";
import { useAuth } from "../context/AuthContext";
import { profileBlank } from "../assets";

const ListFollowers = ({ follower, handleNavigate, id }) => {
  const { auth } = useAuth();

  return (
    <div
      key={follower.id}
      className="flex flex-row items-center justify-between px-2 py-3 mb-4 bg-white shadow-lg rounded-xl"
    >
      <div className="flex flex-row items-center gap-4">
        <img
          src={follower?.profilePictureUrl || profileBlank}
          alt={follower?.id}
          onError={(e) => {
            e.target.src = profileBlank;
          }}
          className="object-cover w-12 h-12 border-2 border-white cursor-pointer rounded-xl"
          onClick={() => handleNavigate(follower?.id)}
        />
        <div className="flex flex-col justify-center">
          <p
            className="font-semibold tracking-wide cursor-pointer"
            onClick={() => handleNavigate(follower?.id)}
          >
            {follower?.username}
          </p>
          <p className="tracking-wide text-gray-500">{follower?.email}</p>
        </div>
      </div>
      <button
        className="px-4 py-1 tracking-wide text-white transition-all bg-black rounded-lg"
        onClick={() => handleNavigate(follower?.id)}
      >
        Lihat Profil
      </button>
    </div>
  );
};

export default ListFollowers;
