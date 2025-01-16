import { axiosInstance as axios } from "../axios/axios";

const token = localStorage.getItem("token");

export const followUser = async (data) => {
  try {
    const follow = await axios({
      url: `api/v1/follow`,
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return follow.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const unfollow = await axios({
      url: `api/v1/unfollow/${userId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return unfollow.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyFollowing = async (request) => {
  try {
    const myFollowing = await axios({
      url: `api/v1/my-following?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return myFollowing.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyFollowers = async (request) => {
  try {
    const myFollowers = await axios({
      url: `api/v1/my-followers?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return myFollowers.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getFollowingByUserId = async (request, userId) => {
  try {
    const followingByUserId = await axios({
      url: `api/v1/following/${userId}?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return followingByUserId.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getFollowersByUserId = async (request, userId) => {
  try {
    const followersByUserId = await axios({
      url: `api/v1/followers/${userId}?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return followersByUserId.data;
  } catch (error) {
    throw error.response.data;
  }
};
