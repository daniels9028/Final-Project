import { axiosInstance as axios } from "../axios/axios";

export const uploadImage = async (image) => {
  try {
    const upload = await axios({
      url: "api/v1/upload-image",
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbEBnbWFpbC5jb20iLCJ1c2VySWQiOiJmMDE3ZWYzZC0xMmY5LTQ3NWQtYjNiOS00NjEyNzYzZGYyYzQiLCJyb2xlIjoiZ2VuZXJhbCIsImlhdCI6MTczNjc1NjQ0NX0.Ef5A96qkZ5fOwDTikV51nVOVOPBwJbq89eyvysbJi8Y`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        image: image,
      },
    });

    return upload.data;
  } catch (error) {
    throw error.response.data;
  }
};
