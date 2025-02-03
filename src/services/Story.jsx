import { axiosInstance as axios } from "../axios/axios";
import { uploadImage } from "./Upload";
import { getToken } from "../services/token";

export const getMyStories = async (request) => {
  const token = getToken();

  try {
    const myStories = await axios({
      url: `api/v1/my-story?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return myStories.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyFollowingStories = async (request) => {
  const token = getToken();

  try {
    const followingStories = await axios({
      url: `api/v1/following-story?size=${request.size}&page=${request.page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return followingStories.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createStory = async (dataStory) => {
  const token = getToken();

  try {
    // const { url } = await uploadImage(dataStory.file);

    // const { file, ...data } = dataStory;

    const create = await axios({
      url: "api/v1/create-story",
      method: "POST",
      data: dataStory,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return create.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteStory = async (storyId) => {
  const token = getToken();

  try {
    const request = await axios({
      url: `api/v1/delete-story/${storyId}`,
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

export const getStoryById = async (storyId) => {
  const token = getToken();

  try {
    const storyById = await axios({
      url: `api/v1/story/${storyId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return storyById.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getStoryViewsByStoryId = async (storyId) => {
  const token = getToken();

  try {
    const storyViewsById = await axios({
      url: `api/v1/story-views/${storyId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return storyViewsById.data;
  } catch (error) {
    throw error.response.data;
  }
};
