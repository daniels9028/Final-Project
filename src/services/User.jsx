import { axiosInstance as axios } from "../axios/axios";
import { uploadImage } from "./Upload";

export const getLoggedUser = async (token) => {
  try {
    const user = await axios({
      url: "api/v1/user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateProfile = async (dataProfile) => {
  const token = localStorage.getItem("token");

  try {
    const update = await axios({
      url: "api/v1/update-profile",
      method: "POST",
      data: dataProfile,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return update.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUserById = async (userId) => {
  const token = localStorage.getItem("token");

  try {
    const dataUser = await axios({
      url: `api/v1/user/${userId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return dataUser.data;
  } catch (error) {
    throw error.response.data;
  }
};
