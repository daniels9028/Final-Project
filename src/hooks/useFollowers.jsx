import React, { useState } from "react";
import { getFollowersByUserId, getMyFollowers } from "../services/Follow";

const useFollowers = (id) => {
  const [isModalFollowersOpen, setModalFollowersOpen] = useState(false);

  const openModalFollowers = () => setModalFollowersOpen(true);
  const closeModalFollowers = () => setModalFollowersOpen(false);

  const [followers, setFollowers] = useState([]);

  const [followersPage, setFollowersPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleMyFollowers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const { data } = await getMyFollowers({ size: 10, page: followersPage });

      setFollowers((prev) => [...prev, ...data.users]);
      setHasMore(data.users.length > 0);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleFollowersByUserId = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const { data } = await getFollowersByUserId(
        { size: 10, page: followersPage },
        id
      );

      setFollowers((prev) => [...prev, ...data.users]);
      setHasMore(data.users.length > 0);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleScrollFollowers = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      setFollowersPage((prev) => prev + 1);
    }
  };

  return {
    isModalFollowersOpen,
    handleMyFollowers,
    handleFollowersByUserId,
    openModalFollowers,
    closeModalFollowers,
    followers,
    followersPage,
    handleScrollFollowers,
  };
};

export default useFollowers;
