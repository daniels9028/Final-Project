import { axiosInstance as axios } from "../axios/axios";
import { getToken } from "./token";

export const uploadImage = async (image) => {
  const token = getToken();

  try {
    const upload = await axios({
      url: "api/v1/upload-image",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        image: image,
      },
    });

    return upload.data;
  } catch (error) {
    throw error;
  }
};
