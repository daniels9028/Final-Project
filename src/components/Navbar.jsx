import React from "react";
import { profile } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ handleLogout, auth }) => {
  const { user } = auth;
  console.log(user);
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-300 text-black h-20">
      <div className="max-w-7xl h-full mx-auto px-8 flex items-center justify-between">
        <p className="tracking-wider text-xl">Instagram</p>
        <ul className="flex flex-row items-center justify-center gap-12 tracking-wider text-lg cursor-pointer">
          <li>Home</li>
          <li>Story</li>
        </ul>
        <div className="flex flex-row items-center justify-center gap-6">
          <img
            src={user.profilePictureUrl || profile}
            alt=""
            className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
          />
          <div>
            <p>{user?.username}</p>
            <p>{user?.name}</p>
          </div>
          <button
            className="bg-gray-400 rounded-full p-2"
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
