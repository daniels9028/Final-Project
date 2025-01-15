import { axiosInstance as axios } from "../axios/axios";

import { getToken } from "./token";

export const likePost = async (data) => {
  const token = getToken();

  try {
    const like = await axios({
      url: "api/v1/like",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return like.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const unlikePost = async (data) => {
  const token = getToken();

  try {
    const unlike = await axios({
      url: "api/v1/unlike",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return unlike.data;
  } catch (error) {
    throw error.response.data;
  }
};
