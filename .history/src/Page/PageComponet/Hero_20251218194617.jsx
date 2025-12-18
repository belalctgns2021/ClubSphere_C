import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Img from '../../assets/Gemini_Generated_Image_hlhhcwhlhhcwhlhh-modified.png'

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-900 to-indigo-700 py-32 relative overflow-hidden perspective-1000">
  <div className="lg:max-w-6xl lg:mx-auto w-full px-6 grid lg:grid-cols-2 gap-10 items-center">

    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
        Discover, Join & Manage <span className="text-yellow-400">Local Clubs</span>
      </h1>
      <p className="text-gray-200 text-lg mb-8">
        Connect with passionate people, attend exciting events, and be part of thriving communities. Your next adventure starts here!
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/aboutUs"
          className="px-6 py-3 bg-yellow-400 text-purple-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300"
        >
          Explore Clubs
        </Link>
        <Link
          to="/showAllClub"
          className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-purple-900 transition duration-300"
        >
          Join Now
        </Link>
      </div>
    </motion.div>

    {/* Right Content — Animated 3D Card */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full flex justify-center"
    >
      <motion.div
        className="w-80 h-80 rounded-3xl bg-gradient-to-l from-indigo-600 to-purple-800 shadow-2xl flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden transform-gpu"
        whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Moving Shine */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="absolute top-0 h-full w-20 bg-white/25 blur-2xl rotate-12"
        ></motion.div>

        <motion.img
          src={Img}
          alt=""
          className="relative z-10 w-40 h-40 rounded-lg shadow-lg"
          whileHover={{ rotateY: -10, rotateX: -5 }}
        />
      </motion.div>
    </motion.div>

  </div>

  {/* Decorative 3D Circles */}
  <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-3xl animate-pulse transform-gpu rotate-12"></div>
  <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white/20 blur-3xl animate-pulse transform-gpu rotate-6"></div>
</div>


  );
};

export default Hero;
