import React from "react";
import { profile } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../services/Authentication";

const Navbar = ({ auth }) => {
  const { user } = auth;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logout(auth.token);

      localStorage.clear();

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-lg text-black h-20">
      <div className="max-w-7xl h-full mx-auto px-12 flex items-center justify-between">
        <Link className="tracking-wider text-xl font-bold" to="/">
          Instagram
        </Link>
        <div className="flex flex-row items-center justify-center gap-20">
          <Link
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
            to={`/profile/${user.id}`}
          >
            <img
              src={user?.profilePictureUrl || profile}
              alt=""
              className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
            />
            <div>
              <p className="text-base font-bold">{user?.username}</p>
              <p className="text-sm text-gray-500 font-semibold">
                {user?.name}
              </p>
            </div>
          </Link>
          <button
            className="bg-gray-400 rounded-full p-3 hover:bg-gray-500 transition-all"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
