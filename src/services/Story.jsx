import { axiosInstance as axios } from "../axios/axios";
import { uploadImage } from "./Upload";

const token = localStorage.getItem("token");

export const createStory = async (dataStory) => {
  try {
    const { url } = await uploadImage(dataStory.file);

    const { file, ...data } = dataStory;

    const create = await axios({
      url: "api/v1/create-story",
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

export const deleteStory = async (storyId) => {
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

export const getMyFollowingStories = async (request) => {
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
