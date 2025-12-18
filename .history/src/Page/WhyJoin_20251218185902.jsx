import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaStar, FaBolt, FaHeart, FaArrowRight } from "react-icons/fa"; // Added FaArrowRight

const features = [
   {
        icon: <FaUsers />,
        title: "Strong Community",
        desc: "Connect with passionate people who share your vision and drive.",
        color: "indigo-500",
    },
    {
        icon: <FaBolt />,
        title: "Skill Development",
        desc: "Gain hands-on experience in leadership, teamwork, and tech.",
        color: "green-500",
    },
    {
        icon: <FaStar />,
        title: "Exclusive Opportunities",
        desc: "Access special workshops, sessions, and professional networking.",
        color: "yellow-500",
    },
    {
        icon: <FaHeart />,
        title: "Make Real Impact",
        desc: "Work on meaningful projects that drive positive community change.",
        color: "red-500",
    },
];

const WhyJoin = () => {
    const accentColor = "blue-600";
    const darkText = "gray-900";

    return (
       <div className="w-full pt-24 pb-24 bg-white perspective-1200">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* --- Title Section --- */}
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`text-sm font-semibold uppercase tracking-widest text-${accentColor} mb-2`}
    >
      Benefits & Value
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`text-4xl sm:text-5xl font-extrabold text-${darkText} mb-4`}
    >
      The Advantages of Membership
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-gray-600 max-w-3xl mx-auto mb-16 text-base sm:text-lg"
    >
      Becoming a member means more than just joining a group—it means
      gaining a platform for growth, connection, and real-world achievement.
    </motion.p>

    {/* --- Features Grid --- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {features.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            scale: 1.06,
            rotateX: 8,
            rotateY: -6,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
          className={`bg-gray-50 rounded-xl p-8 border-t-4 border-${item.color} shadow-md text-center cursor-pointer transition-all duration-300 h-full flex flex-col transform-gpu`}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4 text-4xl sm:text-5xl">{item.icon}</div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">{item.title}</h3>

          {/* Description */}
          <p className="text-gray-600 flex-grow">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</div>

    );
};

export default WhyJoin;