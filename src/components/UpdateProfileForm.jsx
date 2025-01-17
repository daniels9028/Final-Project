import React from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";

const UpdateProfileForm = ({
  error,
  success,
  handleUpdateProfile,
  form,
  handleChange,
  handleFileChange,
  loading,
}) => {
  return (
    <>
      {error.message && (
        <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-red-500 rounded-lg">
          {error.message}
        </p>
      )}

      {success && (
        <p className="px-4 py-2 mb-2 tracking-wide text-white capitalize bg-green-500 rounded-lg">
          {success}
        </p>
      )}
      <form className="space-y-4 p-4" onSubmit={handleUpdateProfile}>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full space-y-2 lg:w-1/2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your name..."
              value={form?.name}
              onChange={handleChange}
            />
            {error.name && <p className="text-sm text-red-500">{error.name}</p>}
          </div>
          <div className="w-full space-y-2 lg:w-1/2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your username..."
              value={form?.username}
              onChange={handleChange}
            />
            {error.username && (
              <p className="text-sm text-red-500">{error.username}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your email..."
              value={form?.email}
              onChange={handleChange}
            />
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              type="text"
              name="bio"
              value={form?.bio}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your bio..."
              onChange={handleChange}
            ></textarea>
            {error.bio && <p className="text-sm text-red-500">{error.bio}</p>}
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full space-y-2">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePictureUrl"
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your website..."
              onChange={handleFileChange}
            />
            {error.profilePictureUrl && (
              <p className="text-sm text-red-500">{error.profilePictureUrl}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full space-y-2">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              type="text"
              name="website"
              value={form?.website}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your website..."
              onChange={handleChange}
            />
            {error.website && (
              <p className="text-sm text-red-500">{error.website}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={form?.phoneNumber}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your phoneNumber..."
              onChange={handleChange}
            />
            {error.phoneNumber && (
              <p className="text-sm text-red-500">{error.phoneNumber}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-32 py-2 text-lg font-medium text-white bg-orange-500 rounded-md hover:bg-orange-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfileForm;
