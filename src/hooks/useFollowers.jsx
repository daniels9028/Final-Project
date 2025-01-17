import React, { useState } from "react";
import { getFollowersByUserId, getMyFollowers } from "../services/Follow";

const useFollowers = (id) => {
  const [isModalFollowersOpen, setModalFollowersOpen] = useState(false);

  const openModalFollowers = () => setModalFollowersOpen(true);
  const closeModalFollowers = () => setModalFollowersOpen(false);

  const [followers, setFollowers] = useState([]);

  const [followersPage, setFollowersPage] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  });

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

  return {
    isModalFollowersOpen,
    handleMyFollowers,
    handleFollowersByUserId,
    openModalFollowers,
    closeModalFollowers,
    followers,
  };
};

export default useFollowers;
