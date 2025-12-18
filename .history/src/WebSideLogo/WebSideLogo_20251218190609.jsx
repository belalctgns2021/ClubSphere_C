import React from 'react';
import Img from '../assets/Gemini_Generated_Image_hlhhcwhlhhcwhlhh.png'

const WebSideLogo = () => {
        return (
   <div className="w-full flex justify-center">
  <div
    className="w-[150px] h-[50px] rounded-2xl overflow-hidden cursor-pointer perspective-1000 transform-gpu"
  >
    <img
      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out hover:rotate-x-6 hover:rotate-y-6"
      src={Img}
      alt="Logo"
    />
  </div>
</div>

    );
};

export default WebSideLogo;