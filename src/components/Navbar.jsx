import React, { useState } from "react";
import { profile, vista } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../services/Authentication";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigateUser } from "../hooks";
import Swal from "sweetalert2";

const Navbar = ({ auth }) => {
  const { user } = auth;

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateNavbar = (userId) => {
    window.open(`${window.location.origin}/profile/${userId}`, "_self");
  };

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

      Swal.fire({
        title: "Sukses",
        text: "Logout berhasil",
        icon: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-20 text-black bg-white shadow-lg">
      <div className="flex items-center justify-between h-full px-6 mx-auto max-w-7xl lg:px-12">
        <div className="z-50 flex flex-row items-center justify-center gap-2">
          <img src={vista} className="object-cover w-14 h-14" />
          <Link className="text-2xl font-bold tracking-widest" to="/">
            Vista
          </Link>
        </div>
        <div className="flex-row items-center justify-center hidden gap-10 lg:flex">
          <div
            className="flex flex-row items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigateNavbar(user?.id)}
          >
            <img
              src={user?.profilePictureUrl || profile}
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
          </div>
          <button
            className="p-3 transition-all bg-gray-400 rounded-full hover:bg-gray-500"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
          </button>
        </div>
        <div
          className="z-50 flex text-3xl transition-all cursor-pointer lg:hidden"
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
              onClick={toggleMenu}
            >
              <img
                src={user?.profilePictureUrl || profile}
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
