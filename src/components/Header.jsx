import React, { useState } from "react";
import { profile, vista } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../services/Authentication";
// import { GiHamburgerMenu } from "react-icons/gi";
import { FiAlignLeft } from "react-icons/fi";

import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigateUser } from "../hooks";
import Swal from "sweetalert2";

const Header = ({ auth }) => {
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
      x: "-100%",
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
    <div className="flex flex-row items-center justify-between w-full max-w-5xl px-6 py-4 mx-auto lg:px-12 lg:py-8">
      <div className="z-50 flex flex-row items-center justify-center">
        <img src={vista} className="object-cover w-14 h-14" />
        <Link
          className="text-2xl italic font-semibold tracking-widest text-white"
          to="/"
        >
          Vista
        </Link>
      </div>
      <div
        className="flex-row items-center justify-center cursor-pointer"
        onClick={() => navigateNavbar(user?.id)}
      >
        <img
          src={user?.profilePictureUrl || profile}
          alt={user?.id}
          onError={(e) => {
            e.target.src = profile;
          }}
          className="object-cover border-2 border-gray-400 rounded-full w-11 h-11"
        />
      </div>
    </div>
  );
};

export default Header;
