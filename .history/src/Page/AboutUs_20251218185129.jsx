import React from "react";
import { motion } from "framer-motion";
import Img from '../assets/Gemini_Generated_Image_hlhhcwhlhhcwhlhh-modified.png'

const AboutUs = () => {
  return (
    <div className="w-full pt-28 sm:pt-36 mb-32 sm:mb-44 bg-white perspective-1200">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 sm:gap-14 items-center">

    {/* ---------- Left Content ---------- */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, rotateX: 3 }}
      className="transform-gpu"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        About Our Club
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">
        We are a community of passionate learners and creators who believe in
        growing together. Our club focuses on innovation, teamwork, and
        providing opportunities for everyone to develop their skills and
        confidence.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Through events, workshops, and real-world projects, we help members
        build strong connections, gain hands-on experience, and make a
        positive impact in the community.
      </p>
    </motion.div>

    {/* ---------- Right Side 3D Block ---------- */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotateY: -10, rotateX: 6 }}
      className="w-full transform-gpu"
    >
      <div
        className="
          relative w-full h-60 sm:h-72
          rounded-2xl
          bg-gradient-to-l from-[#002455] to-[#8ABEB9]
          shadow-[0_15px_40px_rgba(0,0,0,0.3)]
          overflow-hidden flex items-center justify-center
        "
      >
        {/* Top Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_60%)]"></div>

        {/* Bottom Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_70%)]"></div>

        {/* Moving Shine */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="absolute top-0 h-full w-24 bg-white/20 blur-2xl rotate-12"
        />

        {/* Image */}
        <motion.span
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 260 }}
        >
          <img
            src={Img}
            alt="Club"
            className="w-32 sm:w-40 drop-shadow-xl"
          />
        </motion.span>
      </div>
    </motion.div>
  </div>
</div>

  );
};

export default AboutUs;
