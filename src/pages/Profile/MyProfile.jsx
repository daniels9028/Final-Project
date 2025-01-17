import React, { useEffect } from "react";
import { getUserById } from "../../services/User";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Posts,
  Navbar,
  ProfileHeader,
  Modal,
  ListFollowers,
  ListFollowing,
  UpdateProfileForm,
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

  const { handleFollow, handleUnFollow, follow } = useFollow();

  const { myPost, myPostPage, postByUserId } = usePostByUserId(id);

  const { myFollowingPost, myFollowingPostPage, handleMyFollowingPost } =
    useFollowingPost();

  const { handleDeletePost, isDelete } = useCrudPost();

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
    isModalUpdateOpen,
    openModalUpdate,
    closeModalUpdate,
    user,
    setUser,
    setForm,
    error,
    success,
    handleUpdateProfile,
    form,
    handleChange,
    handleFileChange,
    loading,
  } = useUpdateProfile();

  const handleGetUserById = async () => {
    try {
      const dataUser = await getUserById(id);
      setUser(dataUser.data);
      setForm(dataUser.data);
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
    // handleFollow(id);
  }, [id]);

  useEffect(() => {
    handleGetUserById();
    id === auth.user.id ? handleMyFollowing() : handleFollowingByUserId();
    id === auth.user.id ? handleMyFollowers() : handleFollowersByUserId();
  }, [follow]);

  useEffect(() => {
    postByUserId();
  }, [isDelete]);

  return (
    <div>
      <Navbar auth={auth} />

      <ProfileHeader
        user={user}
        id={id}
        auth={auth}
        openModalUpdate={openModalUpdate}
        follow={follow}
        openModalFollowing={openModalFollowing}
        openModalFollowers={openModalFollowers}
        handleFollow={handleFollow}
        handleUnFollow={handleUnFollow}
      />

      <Posts
        explorePost={myPost}
        explorePage={myPostPage}
        handleDeletePost={handleDeletePost}
      />

      {id === auth.user.id && (
        <>
          <p className="-mb-12 text-xl font-bold text-center underline">
            My Following Post
          </p>
          <Posts
            explorePost={myFollowingPost}
            explorePage={myFollowingPostPage}
            handleDeletePost={handleDeletePost}
          />
        </>
      )}

      <Modal
        isOpen={isModalUpdateOpen}
        onClose={closeModalUpdate}
        title="Edit Profile"
      >
        <UpdateProfileForm
          error={error}
          success={success}
          handleUpdateProfile={handleUpdateProfile}
          form={form}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          loading={loading}
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
    </div>
  );
};

export default MyProfile;
