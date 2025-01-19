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
    <nav className="fixed top-0 left-0 w-full h-20 text-black bg-white shadow-lg">
      <div className="flex items-center justify-between h-full px-6 mx-auto max-w-7xl lg:px-12">
        <Link className="text-xl font-bold tracking-wider" to="/">
          Instagram
        </Link>
        <div className="flex flex-row items-center justify-center gap-20">
          <Link
            className="flex flex-row items-center justify-center gap-2 cursor-pointer"
            to={`/profile/${user.id}`}
          >
            <img
              src={user?.profilePictureUrl}
              alt={user?.id}
              onError={(e) => {
                e.target.src = profile;
              }}
              className="object-cover w-12 h-12 border-2 border-gray-200 rounded-full"
            />
            <div>
              <p className="text-base font-bold">{user?.username}</p>
              <p className="text-sm font-semibold text-gray-500">
                {user?.name}
              </p>
            </div>
          </Link>
          <button
            className="p-3 transition-all bg-gray-400 rounded-full hover:bg-gray-500"
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
