import { axiosInstance as axios } from "../axios/axios";

const token = localStorage.getItem("token");

export const createComment = async (data) => {
  try {
    console.log(data);
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
