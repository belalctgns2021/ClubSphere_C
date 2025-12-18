import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { AuthContext } from '../Provider/AuthProvider';
import Img from '../assets/user.png';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Loding from '../Error And Loding Page/Loding';
import {
    FaUserCircle,
    FaSignOutAlt,
    FaTachometerAlt,
    FaHome,         
    FaInfoCircle,   
    FaUsers,       
    FaPenSquare,    
    FaBookOpen  ,
    FaGlobe    
} from 'react-icons/fa';

const navVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const Navber = () => {
    const { user, LogOut, loading } = useContext(AuthContext);

    if (loading) {
        return <Loding />;
    }

    const handleLogOut = () => {
        LogOut()
            .then(() => {
                
            })
            .catch((error) => {
                alert(error.message);
            });
    };


    const navItems = [
        { to: '/', label: 'Home', icon: FaHome },
        { to: '/aboutUs', label: 'About Us', icon: FaInfoCircle },
        { to: '/whyJoin', label: 'Why Join', icon: FaUsers },
        { to: '/creatAClub', label: 'Create A Club', icon: FaPenSquare },
        { to: '/showAllClub', label: 'All Clubs', icon: FaUsers },
        { to: '/showAllEvent', label: 'All Events', icon: FaGlobe },
        { to: '/blog', label: 'Blog', icon: FaBookOpen },
    ];

    const Linkss = (
        <>
            {navItems.map((link, index) => (
                <motion.li
                    key={index}
                    data-tooltip-id="infoTip"
                    data-tooltip-content={link.label}
                    variants={linkVariants}
                >
                    <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                            `font-medium text-lg px-4 py-2 rounded-lg transition-colors duration-300 
                            ${isActive ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'}
                            flex items-center gap-2` 
                        }
                    >
                        <link.icon className="text-xl" /> 
                        {link.label}
                    </NavLink>
                </motion.li>
            ))}

            {/* Dashboard Link for Logged-in User */}
            {user && (
                <motion.li data-tooltip-id="infoTip" data-tooltip-content="Dashboard" variants={linkVariants}>
                    <NavLink
                        to='/dashboard/myjoinclub'
                        className={({ isActive }) =>
                            `font-medium text-lg px-4 py-2 rounded-lg transition-colors duration-300 
                            ${isActive ? 'text-green-600 bg-green-50 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'}
                            flex items-center gap-2`
                        }
                    >
                        <FaTachometerAlt className='text-xl' /> My Dashboard
                    </NavLink>
                </motion.li>
            )}
        </>
    );

    return (
       <motion.div
  initial="hidden"
  animate="visible"
  variants={navVariants}
  className="w-full bg-gray-900 shadow-lg sticky top-0 z-50 transition-all duration-300"
>
  <div className="navbar w-11/12 mx-auto px-4 py-3">

    {/* --- Navbar Start (Logo and Mobile Dropdown) --- */}
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-gray-800 rounded-lg z-[1] mt-3 w-64 p-4 shadow-xl border border-gray-700 space-y-2 text-white"
        >
          {Linkss}
        </ul>
      </div>

      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Link to='/' className="text-2xl font-extrabold text-white flex items-center gap-2">
          <div className='lg:hidden'>
            <WebSideLogo />
          </div>
          <span className='hidden sm:inline'>ClubVerse</span>
        </Link>
      </motion.div>
    </div>

    {/* --- Navbar Center (Desktop Links) --- */}
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 space-x-2 text-white">
        {Linkss.map((link, idx) => (
          <li key={idx} className="hover:text-blue-400 transition-colors duration-300">{link}</li>
        ))}
      </ul>
    </div>

    {/* --- Navbar End (User & Auth) --- */}
    <div className="navbar-end flex items-center gap-2">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar border-2 border-blue-500 p-0 m-0 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
            data-tooltip-id="infoTip"
            data-tooltip-content={user?.displayName || "Profile"}
          >
            <div className="w-10 rounded-full">
              <img
                alt={user?.displayName || "User"}
                src={user?.photoURL || Img}
                className='object-cover'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-lg z-[1] mt-3 w-64 p-3 shadow-xl border border-gray-700 space-y-1 text-white"
          >
            {/* Profile Info */}
            <li className='px-3 py-2 font-bold border-b border-gray-700 mb-1 flex flex-col'>
              <span className="flex items-center gap-2">
                <FaUserCircle className='text-lg text-blue-500' />
                {user?.displayName || 'User'}
              </span>
              <p className='text-xs font-normal text-gray-400 truncate mt-1'>{user?.email}</p>
            </li>
            {/* Dashboard Link */}
            <li>
              <Link to="/dashboard/myjoinclub" className='hover:bg-blue-500/20 text-blue-400 font-semibold flex items-center gap-2 rounded-lg px-2 py-1 transition-colors'>
                <FaTachometerAlt className='text-lg' /> Dashboard
              </Link>
            </li>
            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-block bg-red-600 hover:bg-red-700 text-white border-0 mt-2"
              >
                <FaSignOutAlt /> Log Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/auth/login"
            className="btn bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold px-6 py-2 border-0 shadow-md transition-all duration-300"
          >
            Login
          </Link>
        </motion.div>
      )}

      <Tooltip id="infoTip" place="bottom" />
    </div>
  </div>
</motion.div>

    );
};

export default Navber;