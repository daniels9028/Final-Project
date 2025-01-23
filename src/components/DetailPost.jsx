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
}) => {
  if (!isOpen) return null;

  const { user } = auth;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl mx-4 overflow-hidden h-[90vh] bg-white rounded-lg shadow-lg sm:mx-auto">
        <div className="flex justify-end p-4 border-b border-gray-300">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✖
          </button>
        </div>
        <div className="h-full w-full flex flex-row">
          <div className="w-1/2">
            <img
              src={explore?.imageUrl}
              onError={(e) => {
                e.target.src = alternativeImageUrlPost;
              }}
              alt={explore?.id}
              className="h-full object-cover"
            />
          </div>
          <div className="w-1/2 relative">
            <div className="overflow-y-auto no-scrollbar p-4 h-full">
              <div className="flex flex-row items-center space-x-4">
                <img
                  src={explore?.user?.profilePictureUrl}
                  onError={(e) => {
                    e.target.src = profileBlank;
                  }}
                  alt={explore?.user?.id}
                  className="object-cover border-2 border-gray-400 rounded-full w-12 h-12"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-medium tracking-wider">
                    {explore?.user?.username}
                  </p>
                  <p className="font-light tracking-wide">{explore?.caption}</p>
                </div>
              </div>

              <div className="mt-10 space-y-6">
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
                        <p className="text-base tracking-wider text-gray-800 text-wrap">
                          {comment?.comment}
                        </p>
                      </div>
                    </div>
                    {comment?.user?.id === auth.user.id && (
                      <div
                        className="flex items-center justify-center w-8 h-8 border-2 border-gray-300 p-2 rounded-full cursor-pointer hover:bg-red-500"
                        onClick={() => handleDeleteComment(comment?.id)}
                      >
                        <FaRegTrashAlt />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 bg-white h-44 z-50 w-full border-t shadow-lg p-4">
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
