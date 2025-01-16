import React, { useEffect, useState } from "react";
import { getLoggedUser, getUserById, updateProfile } from "../../services/User";
import { useAuth } from "../../context/AuthContext";
import {
  followUser,
  getFollowersByUserId,
  getFollowingByUserId,
  getMyFollowers,
  getMyFollowing,
  unfollowUser,
} from "../../services/Follow";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { profileBlank } from "../../assets";
import Modal from "../../components/Modal";
import { getMyFollowingPost, getPostByUserId } from "../../services/Post";
import { Posts } from "../../components";

const MyProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});

  const { auth } = useAuth();

  const [file, setFile] = useState(null);

  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);

  const openModalUpdate = () => setModalUpdateOpen(true);
  const closeModalUpdate = () => setModalUpdateOpen(false);

  const [isModalFollowersOpen, setModalFollowersOpen] = useState(false);

  const openModalFollowers = () => setModalFollowersOpen(true);
  const closeModalFollowers = () => setModalFollowersOpen(false);

  const [isModalFollowingOpen, setModalFollowingOpen] = useState(false);

  const openModalFollowing = () => setModalFollowingOpen(true);
  const closeModalFollowing = () => setModalFollowingOpen(false);

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [myPost, setMyPost] = useState([]);

  const [myPostPage, setMyPostPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [myFollowingPost, setMyFollowingPost] = useState([]);

  const [myFollowingPostPage, setMyFollowingPostPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [form, setForm] = useState({});

  const [followers, setFollowers] = useState([]);

  const [followersPage, setFollowersPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [following, setFollowing] = useState([]);

  const [followingPage, setFollowingPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!form.bio) {
      newErrors.bio = "Bio is required.";
    }

    if (!form.website) {
      newErrors.website = "Website is required.";
    }

    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    }

    if (!file) {
      newErrors.profilePictureUrl = "Profile Picture is required.";
    }

    return newErrors;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setError({});
      setSuccess("");
      setLoading(true);

      await updateProfile({ ...form, file });

      setSuccess("Update profile was successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserById = async () => {
    try {
      const dataUser = await getUserById(id);

      setUser(dataUser.data);
      setForm(dataUser.data);
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async () => {
    try {
      const request = await followUser({
        userIdFollow: "43516236-8bd5-4c43-98ac-8661f3d5b272",
      });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollow = async () => {
    try {
      const request = await unfollowUser(
        "43516236-8bd5-4c43-98ac-8661f3d5b272"
      );

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyFollowing = async () => {
    try {
      const { data } = await getMyFollowing({ size: 10, page: 1 });

      setFollowing(data.users);
      setFollowingPage({
        ...followers,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyFollowers = async () => {
    try {
      const { data } = await getMyFollowers({ size: 10, page: 1 });

      setFollowers(data.users);
      setFollowersPage({
        ...followers,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowingByUserId = async () => {
    try {
      const { data } = await getFollowingByUserId({ size: 10, page: 1 }, id);

      setFollowing(data.users);
      setFollowingPage({
        ...followers,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowersByUserId = async () => {
    try {
      const { data } = await getFollowersByUserId({ size: 10, page: 1 }, id);

      setFollowers(data.users);
      setFollowersPage({
        ...followers,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postByUserId = async () => {
    try {
      const { data } = await getPostByUserId({ size: 10, page: 1 }, id);

      setMyPost(data.posts);
      setMyPostPage({
        ...myPost,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyFollowingPost = async () => {
    try {
      const { data } = await getMyFollowingPost({ size: 10, page: 1 });

      setMyFollowingPost(data.posts);
      setMyFollowingPostPage({
        ...myFollowingPost,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserById();
    postByUserId();
    handleMyFollowingPost();
    id === auth.user.id ? handleMyFollowers() : handleFollowersByUserId();
    id === auth.user.id ? handleMyFollowing() : handleFollowingByUserId();
    // myFollowing();
    // myFollowers();
    // followingByUserId();
    // followersByUserId();
  }, [id]);

  return (
    <div>
      <Navbar auth={auth} />
      <section className="mt-24">
        <div className="flex flex-col items-center justify-center w-full px-12 mx-auto max-w-7xl">
          <div className="flex flex-row gap-40 p-4 justify-center items-center">
            <img
              src={user?.profilePictureUrl}
              onError={(e) => {
                e.target.src = profileBlank;
              }}
              alt={user?.id}
              className="w-44 h-44 object-cover rounded-full border-2 border-gray-400 p-1 cursor-pointer transition-all"
            />
            <div className="flex flex-col justify-start gap-4">
              <div className="flex flex-row items-center gap-8">
                <p className="font-bold text-xl">{user?.username}</p>
                <button
                  className={`bg-gray-200 py-2 px-4 rounded-lg font-semibold ${
                    id !== auth.user.id && "hidden"
                  }`}
                  onClick={openModalUpdate}
                >
                  Edit Profil
                </button>
              </div>
              <div className="flex flex-row items-center gap-8">
                <p
                  className="font-bold text-xl cursor-pointer hover:text-gray-500 transition-all"
                  onClick={openModalFollowing}
                >
                  {user?.totalFollowing}{" "}
                  <span className="font-normal text-base">following</span>
                </p>
                <p
                  className="font-bold text-xl cursor-pointer hover:text-gray-500 transition-all"
                  onClick={openModalFollowers}
                >
                  {user?.totalFollowers}{" "}
                  <span className="font-normal text-base">followers</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="capitalize text-lg font-bold">{user?.name}</p>
                <p className="text-gray-500 font-medium tracking-wide">
                  {user?.bio || "-"}
                </p>
                <a
                  className="underline text-blue-500 font-medium hover:text-blue-600 transition-all cursor-pointer"
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
      <Posts explorePost={myPost} explorePage={myPostPage} />

      {id === auth.user.id && (
        <>
          <p className="-mb-12 text-center font-bold text-xl underline">
            My Following Post
          </p>
          <Posts
            explorePost={myFollowingPost}
            explorePage={myFollowingPostPage}
          />
        </>
      )}

      <Modal
        isOpen={isModalUpdateOpen}
        onClose={closeModalUpdate}
        title="Edit Profile"
      >
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
        <form className="space-y-4" onSubmit={handleUpdateProfile}>
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
              {error.name && (
                <p className="text-red-500 text-sm">{error.name}</p>
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
                value={form?.username}
                onChange={handleChange}
              />
              {error.username && (
                <p className="text-red-500 text-sm">{error.username}</p>
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
                <p className="text-red-500 text-sm">{error.email}</p>
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
              {error.bio && <p className="text-red-500 text-sm">{error.bio}</p>}
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
                <p className="text-red-500 text-sm">
                  {error.profilePictureUrl}
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
                value={form?.website}
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Input your website..."
                onChange={handleChange}
              />
              {error.website && (
                <p className="text-red-500 text-sm">{error.website}</p>
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
                <p className="text-red-500 text-sm">{error.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-32 py-2 text-lg font-medium text-white rounded-md bg-orange-500 hover:bg-orange-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isModalFollowersOpen}
        onClose={closeModalFollowers}
        title="Followers"
      >
        {followers.map((follower) => (
          <div
            key={follower.id}
            className="flex flex-row items-center justify-between mb-4"
          >
            <div className="flex flex-row items-center gap-4">
              <img
                src={follower?.profilePictureUrl}
                alt={follower?.id}
                className="rounded-full w-10 h-10 object-cover"
                onError={(e) => {
                  e.target.src = profileBlank;
                }}
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold tracking-wide">
                  {follower?.username}
                </p>
                <p className="text-slate-500 tracking-wide font-semibold">
                  {follower?.email}
                </p>
              </div>
            </div>
            <button className="bg-gray-200 py-2 px-4 rounded-lg font-semibold">
              Hapus
            </button>
          </div>
        ))}
      </Modal>

      <Modal
        isOpen={isModalFollowingOpen}
        onClose={closeModalFollowing}
        title="Following"
      >
        {following.map((follow) => (
          <div
            key={follow.id}
            className="flex flex-row items-center justify-between mb-4"
          >
            <div className="flex flex-row items-center gap-4">
              <img
                src={follow?.profilePictureUrl}
                alt={follow?.id}
                className="rounded-full w-10 h-10 object-cover"
                onError={(e) => {
                  e.target.src = profileBlank;
                }}
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold tracking-wide">
                  {follow?.username}
                </p>
                <p className="text-slate-500 tracking-wide font-semibold">
                  {follow?.email}
                </p>
              </div>
            </div>
            <button className="bg-gray-200 py-2 px-4 rounded-lg font-semibold">
              Hapus
            </button>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default MyProfile;
