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
    className="w-full bg-gradient-to-r from-blue-900 to-blue-700 shadow-md sticky top-0 z-50 transition-all duration-300"
>
    <div className="navbar w-11/12 mx-auto px-4 py-3 flex items-center justify-between">

        {/* --- Navbar Start (Logo + Mobile Menu) --- */}
        <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <div className="lg:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost p-2 rounded-md bg-white/10 hover:bg-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-64 p-4 bg-white rounded-lg shadow-lg space-y-2 border border-gray-200"
                    >
                        {Linkss}
                    </ul>
                </div>
            </div>

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <WebSideLogo />
                    <span className='hidden sm:inline'>ClubVerse</span>
                </Link>
            </motion.div>
        </div>

        {/* --- Navbar Center (Desktop Links) --- */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="menu menu-horizontal px-1 space-x-4 text-white font-medium">
                {Linkss.map((link, index) => (
                    <li key={index} className="hover:text-amber-400 transition-colors duration-300">
                        {link}
                    </li>
                ))}
            </ul>
        </div>

        {/* --- Navbar End (User / Auth) --- */}
        <div className="flex items-center gap-3">
            {user ? (
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar border-2 border-amber-400 p-0 m-0"
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
                        className="menu menu-sm dropdown-content bg-white rounded-lg z-[1] mt-3 w-64 p-3 shadow-lg border border-gray-200 space-y-2"
                    >
                        <li className='px-3 py-2 text-gray-800 font-bold border-b mb-1 flex flex-col'>
                            <span className='flex items-center gap-2'>
                                <FaUserCircle className='text-amber-500 text-xl' />
                                {user?.displayName || 'User'}
                            </span>
                            <span className='text-xs text-gray-500 truncate mt-1'>{user?.email}</span>
                        </li>
                        <li>
                            <Link to="/dashboard/myjoinclub" className='flex items-center gap-2 text-blue-700 hover:text-amber-500 font-semibold transition-colors duration-300'>
                                <FaTachometerAlt /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-sm w-full bg-red-500 hover:bg-red-600 text-white border-0 mt-1"
                            >
                                <FaSignOutAlt /> Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        to="/auth/login"
                        className="btn bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold px-5 py-2 rounded-md shadow-md transition-colors duration-300"
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