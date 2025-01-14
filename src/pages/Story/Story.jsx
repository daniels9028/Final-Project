import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  createStory,
  deleteStory,
  getMyFollowingStories,
  getStoryById,
  getStoryViewsByStoryId,
} from "../../services/Story";

const Story = () => {
  const { token } = useAuth();

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    caption: "Pengen ayam",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addStory = async () => {
    try {
      const request = await createStory({ ...form, file });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const delStory = async () => {
    try {
      const request = await deleteStory("ec0168a2-4906-4cd9-bada-81e074454cd3");

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const storyById = async () => {
    try {
      const request = await getStoryById(
        "ec0168a2-4906-4cd9-bada-81e074454cd3"
      );

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const storyViewsById = async () => {
    try {
      const request = await getStoryViewsByStoryId(
        "ec0168a2-4906-4cd9-bada-81e074454cd3"
      );

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const myFollowingStories = async () => {
    try {
      const request = await getMyFollowingStories({ size: 10, page: 1 });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // storyById();
    // storyViewsById();
    // myFollowingStories();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} required />
      <button onClick={addStory}>Add Story</button>
      <button onClick={delStory}>Delete Story</button>
    </div>
  );
};

export default Story;
