import React from "react";

const useComment = () => {
  const [form, setForm] = useState({
    postId: "9a7f4133-2111-43b4-9d26-271e25b78679",
    comment: "Pengen juga jadinya",
  });

  const handleAddComment = async () => {
    try {
      const request = await createComment(form);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const request = await deleteComment(
        "2ca62e58-1ccf-475b-b0f8-c6fe43b8c7b9"
      );
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleAddComment, handleDeleteComment };
};

export default useComment;
