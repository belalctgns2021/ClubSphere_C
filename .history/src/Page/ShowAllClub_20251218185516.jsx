import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdCategory } from "react-icons/md";
import { SiClubforce } from "react-icons/si";
import Loding from '../Error And Loding Page/Loding';
import { Link } from 'react-router';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.03, y: -2, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }
};

const ShowAllClub = () => {
    const axiosSecure = useAxiosSecure();

    const { data: clubs = [], isLoading, isError } = useQuery({
        queryKey: ['club', 'approved'],
        queryFn: async () => {
            const res = await axiosSecure.get('/clubs');
            return res.data;
        }
    });

    if (isLoading) return <Loding />;
    if (isError) return <div className="text-center py-20 text-2xl font-semibold text-red-600">Error fetching club data.</div>;
    if (clubs.length === 0) return <div className="text-center py-20 text-2xl font-semibold text-gray-500">No approved clubs found.</div>;

    return (
       <div className="w-full py-14 sm:py-16 bg-gray-50 perspective-1200">
  <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 sm:mb-12 text-center text-gray-800">
    🌐 Explore All Clubs ({clubs.length})
  </h2>

  <motion.div
    className="
      max-w-7xl mx-auto px-4 sm:px-6
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-6 sm:gap-8
    "
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    {clubs
      .filter(club => club.status === "approve")
      .map((club, index) => (
        <motion.div
          key={club._id || index}
          className="
            bg-white rounded-2xl overflow-hidden cursor-pointer
            shadow-lg border border-gray-100
            flex flex-col transform-gpu
          "
          variants={cardVariants}
          whileHover={{ scale: 1.05, rotateX: 8, rotateY: -6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260 }}
        >
          {/* ---------- Image ---------- */}
          <motion.div
            className="relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={club.photoUrl}
              alt={club.clubName}
              className="w-full h-44 sm:h-48 object-cover"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* ---------- Details ---------- */}
          <div className="p-4 sm:p-5 flex flex-col grow">
            <div className="flex gap-2 items-center">
              <SiClubforce className="text-lg sm:text-xl" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {club.clubName}
              </h3>
            </div>

            <div className="flex gap-2 items-center">
              <MdCategory className="text-lg sm:text-xl text-blue-500" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {club.category}
              </h2>
            </div>

            {/* ---------- Meta ---------- */}
            <div className="flex flex-wrap gap-3 items-center text-xs sm:text-sm text-gray-500 mt-2 mb-4">
              <span className="flex items-center gap-1 font-medium">
                <FaMapMarkerAlt className="text-red-500" />
                {club.location}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <FaMoneyBillWave className="text-green-600" />
                {club.membershipFee || "0"} BDT
              </span>
            </div>

            {/* ---------- CTA ---------- */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="mt-auto"
            >
              <Link
                to={`/showAllClub/${club._id}`}
                className="
                  block w-full text-center
                  rounded-2xl py-2
                  bg-linear-to-l from-[#002455] to-[#8ABEB9]
                  text-base sm:text-lg text-white
                "
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
  </motion.div>
</div>

    );
};

export default ShowAllClub;
