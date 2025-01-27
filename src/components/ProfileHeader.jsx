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
    <section className="pb-8 mb-20 border-b-2 border-gray-200 -mt-28">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl px-6 mx-auto lg:px-12">
        <div className="flex flex-col items-center justify-center gap-10 p-4">
          <img
            src={user?.profilePictureUrl}
            onError={(e) => {
              e.target.src = profileBlank;
            }}
            alt={user?.id}
            className="object-cover transition-all shadow-md cursor-pointer w-44 shadow-gray-400 h-52 rounded-xl "
          />
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-xl font-bold tracking-widest text-black">
                {user?.name}
              </p>
              <p className="text-lg font-semibold tracking-wider text-gray-500">
                @{user?.username}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center justify-center transition-all cursor-default text-nowrap">
                <p className="text-xl font-semibold text-black">
                  {user?.totalFollowing}
                </p>
                <p className="text-base font-medium text-gray-500">Postingan</p>
              </div>
              <div
                className="flex flex-col items-center justify-center transition-all cursor-pointer text-nowrap"
                onClick={openModalFollowing}
              >
                <p className="text-xl font-semibold text-black">
                  {user?.totalFollowing}
                </p>
                <p className="text-base font-medium text-gray-500">Mengikuti</p>
              </div>
              <div
                className="flex flex-col items-center justify-center transition-all cursor-pointer text-nowrap"
                onClick={openModalFollowers}
              >
                <p className="text-xl font-semibold text-black">
                  {user?.totalFollowers}
                </p>
                <p className="text-base font-medium text-gray-500">Pengikut</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="tracking-wide">{user?.bio || "-"}</p>
              <a
                className="font-medium text-blue-500 underline transition-all cursor-pointer hover:text-blue-600"
                href={user?.website}
                target="_blank"
              >
                {user?.website || "-"}
              </a>
            </div>
            <button
              className={`bg-slate-300 hover:bg-slate-500 transition-colors py-2 px-4 rounded-lg font-semibold text-nowrap ${
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
                follow
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => (follow ? handleUnFollow(id) : handleFollow(id))}
            >
              {follow ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
