import { axiosInstance as axios } from "../axios/axios";

import { getToken } from "./token";

export const createComment = async (data) => {
  const token = getToken();

  try {
    const comment = await axios({
      url: "api/v1/create-comment",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return comment.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteComment = async (commentId) => {
  const token = getToken();

  try {
    const comment = await axios({
      url: `api/v1/delete-comment/${commentId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return comment.data;
  } catch (error) {
    throw error.response.data;
  }
};
