import { useState } from "react";
import { followUser, getMyFollowing, unfollowUser } from "../services/Follow";

const useFollow = (id) => {
  const [follow, setFollow] = useState(false);

  let listFollowing = [];

  const handleFollow = async (userId) => {
    try {
      await followUser({
        userIdFollow: userId,
      });

      await handleGetAllFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async (userId) => {
    try {
      await unfollowUser(userId);

      await handleGetAllFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllFollowing = async () => {
    try {
      const { data } = await getMyFollowing({ size: 100, page: 1 });

      data.users.forEach((user) => listFollowing.push(user.id));

      if (listFollowing.includes(id)) {
        setFollow(true);
      } else {
        setFollow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleFollow,
    handleUnFollow,
    follow,
    handleGetAllFollowing,
  };
};

export default useFollow;
