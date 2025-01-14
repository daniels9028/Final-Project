import { axiosInstance as axios } from "../axios/axios";

const token = localStorage.getItem("token");

export const likePost = async (data) => {
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
