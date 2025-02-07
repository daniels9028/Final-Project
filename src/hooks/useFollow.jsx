import { useState } from "react";
import { followUser, getMyFollowing, unfollowUser } from "../services/Follow";

const useFollow = (id, refreshFollowing) => {
  const [follow, setFollow] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  let listFollowing = [];

  const handleFollow = async (userId) => {
    try {
      await followUser({
        userIdFollow: userId,
      });

      await handleGetAllFollowing();

      setFollow((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async (userId) => {
    try {
      await unfollowUser(userId);

      await handleGetAllFollowing();

      setFollow((prev) => !prev);

      refreshFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllFollowing = async () => {
    try {
      const { data } = await getMyFollowing({ size: 100, page: 1 });

      data.users.forEach((user) => listFollowing.push(user.id));

      if (listFollowing.includes(id)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleFollow,
    handleUnFollow,
    follow,
    isFollowing,
    handleGetAllFollowing,
  };
};

export default useFollow;
