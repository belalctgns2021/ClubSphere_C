import React from 'react';
import Img from '../assets/Gemini_Generated_Image_hlhhcwhlhhcwhlhh.png'

const WebSideLogo = () => {
    return (
        <div className="w-full flex justify-center">
      <motion.div
        className="w-[150px] h-[50px] rounded-2xl overflow-hidden cursor-pointer transform-gpu perspective-1000"
        whileHover={{
          scale: 1.1,
          rotateX: 10,
          rotateY: -10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <img
          src={src}
          alt="Dynamic"
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500"
        />
      </motion.div>
    </div>
    );
};

export default WebSideLogo;