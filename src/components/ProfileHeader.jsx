import React from "react";
import { profileBlank } from "../assets";
import { useFollow } from "../hooks";

const ProfileHeader = ({
  user,
  id,
  auth,
  openModalUpdateProfile,
  follow,
  openModalFollowing,
  openModalFollowers,
  handleFollow,
  handleUnFollow,
}) => {
  return (
    <section className="my-20">
      <div className="flex flex-col items-center justify-center w-full px-12 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-10 p-4 lg:flex-row lg:gap-40">
          <img
            src={user?.profilePictureUrl}
            onError={(e) => {
              e.target.src = profileBlank;
            }}
            alt={user?.id}
            className="object-cover p-1 transition-all border-2 border-gray-400 rounded-full cursor-pointer w-44 h-44"
          />
          <div className="flex flex-col justify-start gap-4">
            <div className="flex flex-row items-center gap-8">
              <p className="text-xl font-bold text-white tracking-wider">
                {user?.username}
              </p>
              <button
                className={`bg-white hover:bg-slate-300 transition-colors py-2 px-4 rounded-lg font-semibold text-nowrap ${
                  id !== auth.user.id && "hidden"
                }`}
                onClick={openModalUpdateProfile}
              >
                Edit Profil
              </button>
              <button
                className={`transition-all py-2 px-4 rounded-lg font-semibold ${
                  id === auth.user.id && "hidden"
                } ${
                  follow ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
                }`}
                onClick={() => (follow ? handleUnFollow(id) : handleFollow(id))}
              >
                {follow ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="flex flex-row items-center gap-8">
              <p
                className="text-xl transition-all cursor-pointer hover:text-gray-500 text-white font-medium"
                onClick={openModalFollowing}
              >
                {user?.totalFollowing}
                <span className="text-base font-normal"> Mengikuti</span>
              </p>
              <p
                className="text-xl transition-all cursor-pointer hover:text-gray-500 text-white font-medium"
                onClick={openModalFollowers}
              >
                {user?.totalFollowers}
                <span className="text-base font-normal"> Pengikut</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-white capitalize">
                {user?.name}
              </p>
              <p className="font-medium tracking-wide text-gray-200">
                {user?.bio || "-"}
              </p>
              <a
                className="font-medium text-blue-500 underline transition-all cursor-pointer hover:text-blue-600"
                href={user?.website}
                target="_blank"
              >
                {user?.website || "-"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
