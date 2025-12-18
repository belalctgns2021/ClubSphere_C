import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.2
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Contact = () => {
    // Handler for form submission (for demonstration)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send form data to your backend (e.g., using axiosSecure)
        alert('Message Sent! (Demo functionality)');
        e.target.reset(); 
    };

    return (
       <motion.div
    initial="hidden"
    animate="visible"
    variants={navVariants}
    className="w-full bg-gradient-to-r from-pink-100 to-yellow-100 shadow-lg sticky top-0 z-50 transition-all duration-300"
>
    <div className="navbar w-9/12 mx-auto px-4 py-2">

        {/* --- Navbar Start (Logo and Mobile Dropdown) --- */}
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-64 p-4 shadow-xl border border-pink-200 space-y-2 text-gray-800"
                >
                    {Linkss}
                </ul>
            </div>

            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link to='/' className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                    <div className='lg:hidden'>
                        <WebSideLogo />
                    </div>
                    <span className='hidden sm:inline'>ClubVerse</span>
                </Link>
            </motion.div>
        </div>

        {/* --- Navbar Center (Desktop Links) --- */}
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2 text-gray-800">
                {Linkss}
            </ul>
        </div>

        {/* --- Navbar End (User & Auth) --- */}
        <div className="navbar-end flex items-center gap-2">
            {user ? (
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar border-2 border-pink-300 p-0 m-0 hover:shadow-lg hover:shadow-pink-300/50 transition-shadow"
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
                        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-64 p-3 shadow-xl border border-pink-200 space-y-1 text-gray-800"
                    >
                        {/* Profile Info */}
                        <li className='px-3 py-2 font-bold border-b border-pink-200 mb-1 flex flex-col'>
                            <span className="flex items-center gap-2">
                                <FaUserCircle className='text-lg text-pink-400' />
                                {user?.displayName || 'User'}
                            </span>
                            <p className='text-xs font-normal text-gray-500 truncate mt-1'>{user?.email}</p>
                        </li>
                        {/* Dashboard Link */}
                        <li>
                            <Link to="/dashboard/myjoinclub" className='hover:bg-pink-100 text-pink-500 font-semibold flex items-center gap-2 rounded-lg px-2 py-1 transition-colors'>
                                <FaTachometerAlt className='text-lg' /> Dashboard
                            </Link>
                        </li>
                        {/* Logout Button */}
                        <li>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-sm btn-block bg-red-400 hover:bg-red-500 text-white border-0 mt-2"
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
                    className='md:mr-4 mr-0'
                >
                    <Link
                        to="/auth/login"
                        className="btn bg-gradient-to-r from-pink-400 to-yellow-400 hover:from-yellow-400 hover:to-pink-400 text-white font-bold px-6 py-2 border-0 transition-all duration-300"
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

export default Contact;