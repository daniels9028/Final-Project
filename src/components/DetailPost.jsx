import React from "react";
import { alternativeImageUrlPost, profileBlank } from "../assets";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import Like from "./Like";

const DetailPost = ({
  isOpen,
  onClose,
  explore,
  comments,
  auth,
  totalComment,
  form,
  setForm,
  handleKeyDown,
  handleAddComment,
  handleDeleteComment,
}) => {
  if (!isOpen) return null;

  const { user } = auth;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute top-4 right-4">
        <button onClick={onClose} className="text-2xl text-white">
          ✖
        </button>
      </div>

      <div className="w-full lg:max-w-3xl max-w-lg overflow-hidden bg-white h-[80vh] rounded-lg shadow-lg mx-4">
        <div className="flex flex-row w-full h-full">
          <div className="hidden w-full lg:w-1/2 lg:flex">
            <img
              src={explore?.imageUrl}
              onError={(e) => {
                e.target.src = alternativeImageUrlPost;
              }}
              alt={explore?.id}
              className="h-full bg-cover"
            />
          </div>

          <div className="relative w-full h-full lg:w-1/2">
            <div className="flex flex-row items-center p-4 space-x-4 border-b">
              <img
                src={explore?.user?.profilePictureUrl}
                onError={(e) => {
                  e.target.src = profileBlank;
                }}
                alt={explore?.user?.id}
                className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <p className="font-medium tracking-wider">
                  {explore?.user?.username}
                </p>
              </div>
            </div>

            <div className="h-full overflow-y-auto no-scrollbar">
              <img
                src={explore?.imageUrl}
                onError={(e) => {
                  e.target.src = alternativeImageUrlPost;
                }}
                alt={explore?.id}
                className="block h-full p-0 bg-cover lg:hidden"
              />
              <div className="flex flex-row items-center p-4 space-x-4">
                <img
                  src={explore?.user?.profilePictureUrl}
                  onError={(e) => {
                    e.target.src = profileBlank;
                  }}
                  alt={explore?.user?.id}
                  className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-medium tracking-wider text-wrap">
                    {explore?.user?.username}{" "}
                    <span className="font-light">{explore?.caption}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 mt-10 mb-48 space-y-6 lg:mb-48">
                {comments?.map((comment) => (
                  <div
                    className="flex flex-row justify-between"
                    key={comment?.id}
                  >
                    <div className="flex flex-row gap-4">
                      <img
                        src={comment?.user?.profilePictureUrl}
                        alt={comment?.user?.id}
                        className="object-cover w-12 h-12 border-2 border-gray-400 rounded-full"
                      />
                      <div>
                        <p className="font-medium tracking-wide">
                          {comment?.user?.username}
                        </p>
                        <p className="text-sm tracking-wider text-gray-800 text-wrap">
                          {comment?.comment}
                        </p>
                      </div>
                    </div>
                    {comment?.user?.id === auth.user.id && (
                      <div
                        className="flex items-center justify-center w-8 h-8 p-2 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-red-500"
                        onClick={() => handleDeleteComment(comment?.id)}
                      >
                        <FaRegTrashAlt />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-50 w-full p-4 bg-white border-t shadow-lg">
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <Like explore={explore} />
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <GoComment size={28} />
                  {totalComment !== 0 && (
                    <p className="font-bold transition-all">{totalComment}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center w-full gap-4 mt-4">
                <img
                  src={user?.profilePictureUrl}
                  alt={user?.id}
                  onError={(e) => {
                    e.target.src = profileBlank;
                  }}
                  className="object-cover w-10 h-10 border-2 border-gray-400 rounded-full"
                />
                <div className="flex flex-row justify-between w-full px-2 bg-gray-200 border-2 rounded-full outline-none focus:border-blue-500">
                  <input
                    type="text"
                    className="w-full h-10 px-2 text-sm bg-gray-200 border-2 rounded-full outline-none"
                    placeholder="Tambahkan komentar..."
                    name="comment"
                    value={form.comment}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                  />
                  <button
                    className="text-sm font-bold tracking-wider text-gray-600"
                    onClick={() => handleAddComment(explore?.id)}
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
