import React, { useState } from "react";
import { profile, vista } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../services/Authentication";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const Navbar = ({ auth }) => {
  const { user } = auth;

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        stiffness: 20,
        damping: 15,
      },
    },
    closed: {
      x: "100%",
      transition: {
        stiffness: 20,
        damping: 15,
      },
    },
  };

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
    <nav className="fixed top-0 left-0 w-full h-20 text-black bg-white shadow-lg z-50">
      <div className="flex items-center justify-between h-full px-6 mx-auto max-w-7xl lg:px-12">
        <div className="flex flex-row items-center justify-center gap-2 z-50">
          <img src={vista} className="w-14 h-14 object-cover" />
          <Link className="text-2xl font-bold tracking-widest" to="/">
            Vista
          </Link>
        </div>
        <div className="hidden lg:flex flex-row items-center justify-center gap-10">
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
        <div
          className="flex lg:hidden text-3xl cursor-pointer z-50 transition-all"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </div>
        <motion.div
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="fixed top-0 left-0 z-40 block w-full h-screen bg-white rounded-xl lg:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <Link
              className="flex flex-col items-center justify-center gap-4 cursor-pointer"
              to={`/profile/${user.id}`}
            >
              <img
                src={user?.profilePictureUrl}
                alt={user?.id}
                onError={(e) => {
                  e.target.src = profile;
                }}
                className="object-cover w-20 h-20 border-2 border-gray-500 rounded-full"
              />
              <p className="text-xl font-bold tracking-wide">
                {user?.username}
              </p>
              <p className="text-lg font-semibold tracking-widest text-gray-500">
                {user?.name}
              </p>
            </Link>
            <button
              className="p-5 transition-all bg-gray-400 rounded-full hover:bg-gray-500"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
