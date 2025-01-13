import { axiosInstance as axios } from "../axios/axios";
import { uploadImage } from "./Upload";

export const LoginRequest = async (data) => {
  try {
    const login = await axios({
      url: "api/v1/login",
      method: "POST",
      data: data,
    });

    return login.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const RegisterRequest = async (dataRegister) => {
  try {
    const { url } = await uploadImage(dataRegister.file);

    const { file, ...data } = dataRegister;

    const register = await axios({
      url: "api/v1/register",
      method: "POST",
      data: { ...data, profilePictureUrl: url },
    });

    return register.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const Logout = async (token) => {
  try {
    const logout = await axios({
      url: "api/v1/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return logout;
  } catch (error) {
    throw error.response.data;
  }
};
