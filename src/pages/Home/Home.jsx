import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/Authentication";

const Home = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const data = await Logout(token);

      setToken(null);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
