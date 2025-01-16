import { useState } from "react";
import { followUser, unfollowUser } from "../services/Follow";

const useFollow = () => {
  const [follow, setFollow] = useState(false);

  const handleFollow = async (userId) => {
    try {
      await followUser({
        userIdFollow: userId,
      });

      setFollow((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = async (userId) => {
    try {
      await unfollowUser(userId);

      setFollow((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleFollow, handleUnFollow, follow };
};

export default useFollow;
