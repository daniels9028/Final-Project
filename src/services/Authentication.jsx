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

export const RegisterRequest = async (data) => {
  console.log(data.file);
  try {
    const uploadUrl = await uploadImage(data.file);

    console.log(uploadUrl);
    return;

    const register = await axios({
      url: "api/v1/register",
      method: "POST",
      data: data,
    });

    return register.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const Logout = () => {};
