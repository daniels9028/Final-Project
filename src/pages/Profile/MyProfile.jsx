import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/User";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { backgroundProfile } from "../../assets";
import { PiGridFourFill } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";

import {
  Posts,
  Navbar,
  ProfileHeader,
  Modal,
  ListFollowers,
  ListFollowing,
  UpdateProfileForm,
  ModalCreateUpdatePost,
  Header,
  ListMyPost,
} from "../../components";

import {
  useFollow,
  useFollowers,
  useFollowing,
  useUpdateProfile,
  useFollowingPost,
  usePostByUserId,
  useNavigateUser,
  useCrudPost,
} from "../../hooks";

const MyProfile = () => {
  const { id } = useParams();

  const { auth } = useAuth();

  const [page, setPage] = useState("my-post");

  const { handleNavigate } = useNavigateUser();

  const { handleFollow, handleUnFollow, follow, handleGetAllFollowing } =
    useFollow(id);

  const {
    myPost,
    myPostPage,
    postByUserId,
    handleScrollMyPost,
    loadingMyPost,
    hasMoreMyPost,
    totalPost,
  } = usePostByUserId(id);

  const {
    myFollowingPost,
    myFollowingPostPage,
    handleMyFollowingPost,
    handleScrollMyFollowingPost,
    loadingMyFollowingPost,
    hasMoreMyFollowingPost,
  } = useFollowingPost();

  const {
    isModalFollowersOpen,
    handleMyFollowers,
    handleFollowersByUserId,
    openModalFollowers,
    closeModalFollowers,
    followers,
  } = useFollowers(id);

  const {
    isModalFollowingOpen,
    handleMyFollowing,
    handleFollowingByUserId,
    openModalFollowing,
    closeModalFollowing,
    following,
  } = useFollowing(id);

  const {
    isModalUpdateProfileOpen,
    openModalUpdateProfile,
    closeModalUpdateProfile,
    user,
    setUser,
    setFormUpdateProfile,
    errorUpdateProfile,
    successUpdateProfile,
    fileUpdateProfile,
    previewFileUpdateProfile,
    handleUpdateProfile,
    formUpdateProfile,
    handleChangeUpdateProfile,
    handleFileChangeUpdateProfile,
    loadingUpdateProfile,
    isUpdateProfile,
  } = useUpdateProfile();

  const {
    handleDeletePost,
    isDeletePost,
    isUpdatePost,
    formCrudPost,
    handleChangeCrudPost,
    handleUpdatePost,
    errorCrudPost,
    successCrudPost,
    loadingCrudPost,
    fileCrudPost,
    handleFileChangeCrudPost,
    isModalCrudPostOpen,
    openModalCrudPost,
    closeModalCrudPost,
    selectedPost,
    handleSelectPost,
  } = useCrudPost();

  const handleGetUserById = async () => {
    try {
      const dataUser = await getUserById(id);

      setUser(dataUser.data);
      setFormUpdateProfile(dataUser.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserById();

    id === auth.user.id ? handleMyFollowers() : handleFollowersByUserId();
    id === auth.user.id ? handleMyFollowing() : handleFollowingByUserId();
    handleGetAllFollowing();
  }, [id, follow, isUpdateProfile]);

  // useEffect(() => {
  //   handleGetUserById();

  //   id === auth.user.id ? handleMyFollowing() : handleFollowingByUserId();
  //   id === auth.user.id ? handleMyFollowers() : handleFollowersByUserId();
  //   handleGetAllFollowing();
  // }, [follow, isUpdateProfile]);

  useEffect(() => {
    if (isDeletePost || isUpdatePost) {
      postByUserId();
    }
  }, [isDeletePost, isUpdatePost]);

  useEffect(() => {
    postByUserId();
  }, [myPostPage.currentPage]);

  useEffect(() => {
    handleMyFollowingPost();
  }, [myFollowingPostPage.currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollMyPost);

    return () => window.removeEventListener("scroll", handleScrollMyPost);
  }, [loadingMyPost, hasMoreMyPost]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollMyFollowingPost);

    return () =>
      window.removeEventListener("scroll", handleScrollMyFollowingPost);
  }, [loadingMyFollowingPost, hasMoreMyFollowingPost]);

  return (
    <>
      <div
        className="bg-center bg-cover h-60"
        style={{
          backgroundImage: `url(${backgroundProfile})`,
        }}
      >
        <Header auth={auth} />
      </div>

      <ProfileHeader
        user={user}
        id={id}
        auth={auth}
        openModalUpdateProfile={openModalUpdateProfile}
        follow={follow}
        openModalFollowing={openModalFollowing}
        openModalFollowers={openModalFollowers}
        handleFollow={handleFollow}
        handleUnFollow={handleUnFollow}
        totalPost={totalPost}
      />

      <div className="max-w-xl px-6 mx-auto">
        <div className="flex gap-2 p-1 mb-10 bg-gray-100 border border-gray-200 rounded-lg">
          <button
            className={`flex-1 flex items-center justify-center py-2 text-center text-black rounded-lg transition-all ${
              page === "my-post" ? "bg-white font-medium" : "bg-none font-light"
            }`}
            onClick={() => setPage("my-post")}
          >
            <PiGridFourFill size={26} />
          </button>
          {id === auth.user.id && (
            <button
              className={`flex-1 flex items-center justify-center py-2 text-center text-black rounded-lg transition-all ${
                page === "my-following-post"
                  ? "bg-white font-medium"
                  : "bg-none font-light"
              }`}
              onClick={() => setPage("my-following-post")}
            >
              <FaCircleUser size={26} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 mb-10 lg:grid-cols-2 place-items-center">
          {page === "my-post" &&
            myPost.map((post, index) => (
              <ListMyPost key={`${post.id}-${index}`} post={post} />
            ))}

          {page === "my-following-post" &&
            myFollowingPost.map((post, index) => (
              <ListMyPost key={`${post.id}-${index}`} post={post} />
            ))}
        </div>
      </div>

      <Modal
        isOpen={isModalUpdateProfileOpen}
        onClose={closeModalUpdateProfile}
        title="Edit Profile"
      >
        <UpdateProfileForm
          errorUpdateProfile={errorUpdateProfile}
          successUpdateProfile={successUpdateProfile}
          handleUpdateProfile={handleUpdateProfile}
          formUpdateProfile={formUpdateProfile}
          fileUpdateProfile={fileUpdateProfile}
          previewFileUpdateProfile={previewFileUpdateProfile}
          handleChangeUpdateProfile={handleChangeUpdateProfile}
          handleFileChangeUpdateProfile={handleFileChangeUpdateProfile}
          loadingUpdateProfile={loadingUpdateProfile}
        />
      </Modal>

      <Modal
        isOpen={isModalFollowersOpen}
        onClose={closeModalFollowers}
        title="Followers"
      >
        {followers.map((follower) => (
          <ListFollowers
            follower={follower}
            key={follower?.id}
            handleNavigate={handleNavigate}
            id={id}
          />
        ))}
      </Modal>

      <Modal
        isOpen={isModalFollowingOpen}
        onClose={closeModalFollowing}
        title="Following"
      >
        {following.map((follow) => (
          <ListFollowing
            follow={follow}
            key={follow?.id}
            handleNavigate={handleNavigate}
            handleUnFollow={handleUnFollow}
            id={id}
          />
        ))}
      </Modal>
    </>
  );
};

export default MyProfile;
