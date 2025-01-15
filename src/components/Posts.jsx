import React from "react";
import { GoHeart, GoComment } from "react-icons/go";
import { alternativeImageUrlPost, alternativeProfile } from "../assets";

const Posts = ({ explorePost, explorePage }) => {
  return (
    <section className="mt-24">
      <div className="max-w-7xl mx-auto px-12 w-full flex flex-col items-center">
        {explorePost?.map(
          (explore) =>
            explore.user && (
              <div
                key={explore.id}
                className="flex flex-col bg-slate-300 shadow-lg pb-4 mb-8 rounded-lg overflow-hidden border w-1/2"
              >
                <div className="flex flex-row items-center justify-between px-4 py-2">
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={explore?.user?.profilePictureUrl}
                      alt={explore?.user?.id}
                      onError={(e) => {
                        e.target.src = alternativeProfile;
                      }}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <p className="font-bold cursor-pointer">
                      {explore?.user?.username}
                    </p>
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
                    <GoHeart
                      size={28}
                      color={explore?.isLike ? "red" : ""}
                      className="cursor-pointer"
                    />
                    <p>{explore?.totalLikes}</p>
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
                    className="w-full bg-gray-200 h-10 px-2 rounded-full outline-none focus:border-blue-500 border-2"
                    placeholder="Write a comment"
                  />
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default Posts;
