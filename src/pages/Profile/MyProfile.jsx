import React, { useEffect } from "react";
import { getUserById } from "../../services/User";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { backgroundProfile } from "../../assets";
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
  } = usePostByUserId(id);

  const { myFollowingPost, myFollowingPostPage, handleMyFollowingPost } =
    useFollowingPost();

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
    // postByUserId();
    // handleMyFollowingPost();
    id === auth.user.id ? handleMyFollowers() : handleFollowersByUserId();
    id === auth.user.id ? handleMyFollowing() : handleFollowingByUserId();
    // handleFollow(id);
  }, [id]);

  useEffect(() => {
    handleGetUserById();
    id === auth.user.id ? handleMyFollowing() : handleFollowingByUserId();
    id === auth.user.id ? handleMyFollowers() : handleFollowersByUserId();
    handleGetAllFollowing();
  }, [follow, isUpdateProfile]);

  useEffect(() => {
    if (isDeletePost || isUpdatePost) {
      postByUserId();
    }
  }, [isDeletePost, isUpdatePost]);

  useEffect(() => {
    postByUserId();
  }, [myPostPage.currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollMyPost);

    return () => window.removeEventListener("scroll", handleScrollMyPost);
  }, [loadingMyPost, hasMoreMyPost]);

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
      />

      {/* <p className="mb-10 text-2xl font-bold tracking-wider text-center text-white">
        Postingan Anda
      </p> */}

      {/* <Posts
        explorePost={myPost}
        explorePage={myPostPage}
        handleDeletePost={handleDeletePost}
        formCrudPost={formCrudPost}
        handleChangeCrudPost={handleChangeCrudPost}
        handleUpdatePost={handleUpdatePost}
        errorCrudPost={errorCrudPost}
        successCrudPost={successCrudPost}
        loadingCrudPost={loadingCrudPost}
        fileCrudPost={fileCrudPost}
        handleFileChangeCrudPost={handleFileChangeCrudPost}
        isModalCrudPostOpen={isModalCrudPostOpen}
        openModalCrudPost={openModalCrudPost}
        closeModalCrudPost={closeModalCrudPost}
        selectedPost={selectedPost}
        handleSelectPost={handleSelectPost}
      /> */}

      {/* {id === auth.user.id && (
        <>
          <p className="mb-10 text-2xl font-bold tracking-wider text-center text-white">
            Postingan yang Anda ikuti
          </p>
          <Posts
            explorePost={myFollowingPost}
            explorePage={myFollowingPostPage}
            handleDeletePost={handleDeletePost}
          />
        </>
      )} */}

      {/* {loadingMyPost && (
        <p className="text-2xl font-bold tracking-wider text-center text-white">
          Loading...
        </p>
      )}
      {!hasMoreMyPost && (
        <p className="text-2xl font-bold tracking-wider text-center text-white">
          No more posts
        </p>
      )} */}

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
