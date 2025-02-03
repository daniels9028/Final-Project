import React from "react";

const UpdateProfileForm = ({
  errorUpdateProfile,
  handleUpdateProfile,
  formUpdateProfile,
  handleChangeUpdateProfile,
  fileUpdateProfile,
  handleFileChangeUpdateProfile,
  loadingUpdateProfile,
}) => {
  return (
    <>
      <form
        className="p-4 space-y-4 bg-white rounded-lg shadow-lg border"
        onSubmit={handleUpdateProfile}
      >
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
              value={formUpdateProfile?.name}
              onChange={handleChangeUpdateProfile}
            />
            {errorUpdateProfile.name && (
              <p className="text-sm text-red-500">{errorUpdateProfile.name}</p>
            )}
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
              value={formUpdateProfile?.username}
              onChange={handleChangeUpdateProfile}
            />
            {errorUpdateProfile.username && (
              <p className="text-sm text-red-500">
                {errorUpdateProfile.username}
              </p>
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
              value={formUpdateProfile?.email}
              onChange={handleChangeUpdateProfile}
            />
            {errorUpdateProfile.email && (
              <p className="text-sm text-red-500">{errorUpdateProfile.email}</p>
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
              value={formUpdateProfile?.bio}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your bio..."
              onChange={handleChangeUpdateProfile}
            ></textarea>
            {errorUpdateProfile.bio && (
              <p className="text-sm text-red-500">{errorUpdateProfile.bio}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
          <div className="w-full">
            <label
              htmlFor="profilePicture"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>

            <input
              type="file"
              name="profilePictureUrl"
              className="flex items-center justify-center w-full px-4 py-2 mt-1 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleFileChangeUpdateProfile}
            />
            {fileUpdateProfile ? (
              <div className="relative">
                <img
                  src={fileUpdateProfile}
                  alt="Preview"
                  className="object-cover w-full rounded-lg shadow-lg h-60"
                />
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500">
                No image selected
              </p>
            )}
            {errorUpdateProfile.profilePictureUrl && (
              <p className="text-sm text-red-500">
                {errorUpdateProfile.profilePictureUrl}
              </p>
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
              value={formUpdateProfile?.website}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your website..."
              onChange={handleChangeUpdateProfile}
            />
            {errorUpdateProfile.website && (
              <p className="text-sm text-red-500">
                {errorUpdateProfile.website}
              </p>
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
              value={formUpdateProfile?.phoneNumber}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Input your phoneNumber..."
              onChange={handleChangeUpdateProfile}
            />
            {errorUpdateProfile.phoneNumber && (
              <p className="text-sm text-red-500">
                {errorUpdateProfile.phoneNumber}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-32 py-2 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-700"
            disabled={loadingUpdateProfile}
          >
            {loadingUpdateProfile ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfileForm;
