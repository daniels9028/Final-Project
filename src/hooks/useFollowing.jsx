import React, { useState } from "react";
import { getFollowingByUserId, getMyFollowing } from "../services/Follow";

const useFollowing = (id) => {
  const [isModalFollowingOpen, setModalFollowingOpen] = useState(false);

  const openModalFollowing = () => setModalFollowingOpen(true);
  const closeModalFollowing = () => setModalFollowingOpen(false);

  const [following, setFollowing] = useState([]);

  const [followingPage, setFollowingPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleMyFollowing = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const { data } = await getMyFollowing({ size: 10, page: followingPage });

      setFollowing((prev) => [...prev, ...data.users]);
      setHasMore(data.users.length > 0);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleFollowingByUserId = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const { data } = await getFollowingByUserId(
        { size: 10, page: followingPage },
        id
      );

      setFollowing((prev) => [...prev, ...data.users]);
      setHasMore(data.users.length > 0);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      setFollowingPage((prev) => prev + 1);
    }
  };

  return {
    isModalFollowingOpen,
    handleMyFollowing,
    handleFollowingByUserId,
    openModalFollowing,
    closeModalFollowing,
    following,
    followingPage,
    handleScroll,
  };
};

export default useFollowing;
