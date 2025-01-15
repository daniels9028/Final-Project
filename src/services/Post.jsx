import { axiosInstance as axios } from "../axios/axios";
import { uploadImage } from "./Upload";
import { getToken } from "./token";

export const createPost = async (dataPost) => {
  const token = getToken();

  try {
    const { url } = await uploadImage(dataPost.file);

    const { file, ...data } = dataPost;

    const create = await axios({
      url: "api/v1/create-post",
      method: "POST",
      data: { ...data, imageUrl: url },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return create.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePost = async (dataPost, postId) => {
  const token = getToken();

  try {
    const { url } = await uploadImage(dataPost.file);

    const { file, ...data } = dataPost;

    const update = await axios({
      url: `api/v1/update-post/${postId}`,
      method: "POST",
      data: { ...data, imageUrl: url },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return update.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePost = async (postId) => {
  const token = getToken();

  try {
    const request = await axios({
      url: `api/v1/delete-post/${postId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return request.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getExplorePost = async (request) => {
  const token = getToken();

  try {
    const explore = await axios({
      url: `api/v1/explore-post?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return explore.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPostByUserId = async (request, userId) => {
  const token = getToken();

  try {
    const userPost = await axios({
      url: `api/v1/users-post/${userId}?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return userPost.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPostById = async (postId) => {
  const token = getToken();

  try {
    const postById = await axios({
      url: `api/v1/post/${postId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return postById.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyFollowingPost = async (request) => {
  const token = getToken();

  try {
    const followingPost = await axios({
      url: `api/v1/following-post?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return followingPost.data;
  } catch (error) {
    throw error.response.data;
  }
};
