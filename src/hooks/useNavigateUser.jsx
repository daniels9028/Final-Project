import React from "react";

const useNavigateUser = () => {
  const handleNavigate = (userId) => {
    window.open(
      `${window.location.origin}/profile/${userId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return { handleNavigate };
};

export default useNavigateUser;
