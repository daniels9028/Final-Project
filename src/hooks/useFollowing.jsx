import React, { useState } from "react";
import { getFollowingByUserId, getMyFollowing } from "../services/Follow";

const useFollowing = (id) => {
  const [isModalFollowingOpen, setModalFollowingOpen] = useState(false);

  const openModalFollowing = () => setModalFollowingOpen(true);
  const closeModalFollowing = () => setModalFollowingOpen(false);

  const [following, setFollowing] = useState([]);

  const [followingPage, setFollowingPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const handleMyFollowing = async () => {
    try {
      const { data } = await getMyFollowing({ size: 10, page: 1 });

      setFollowing(data.users);
      setFollowingPage({
        ...following,
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
        ...following,
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isModalFollowingOpen,
    handleMyFollowing,
    handleFollowingByUserId,
    openModalFollowing,
    closeModalFollowing,
    following,
  };
};

export default useFollowing;
