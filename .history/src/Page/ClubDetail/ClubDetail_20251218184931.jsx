import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaMoneyBillWave, FaEnvelope } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { SiClubforce } from 'react-icons/si';
import Loding from '../../Error And Loding Page/Loding';
import CardError from '../../Error And Loding Page/CardError';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';

const ClubDetail = () => {
    const { Id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const {data: club,isLoading: clubLoading,isError: clubError,} = useQuery({
        queryKey: ['clubDetail', Id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/clubs/${Id}`);
            return res.data;
        },
        enabled: !!Id,
    });
    const {data: joinedClubs = [],isLoading: joinedLoading,} = useQuery({
        queryKey: ['joinedClubs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/joinMember?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
        retry: false,
    });

    if (authLoading || clubLoading || joinedLoading) return <Loding />;
    if (clubError) return <CardError />;
    if (!club) return <div className="text-center py-20 text-2xl text-gray-500">Club not found.</div>;

    // Determine whether the current user already joined this club
    const alreadyJoined = Boolean(
        joinedClubs && Array.isArray(joinedClubs) && joinedClubs.some(j => {
            // clubId might be stored as string — compare string forms to be safe
            return String(j.clubId) === String(club._id);
        })
    );

    // Handler: start Stripe checkout (redirect). PaymentSuccess page will verify and insert join.
    const handleJoin = async () => {
        if (!user?.email) {
            Swal.fire({
                title: 'Please login first',
                text: 'You must be logged in to join a club.',
                icon: 'warning'
            });
            navigate('/auth/login');
            return;
        }

        try {
            const paymentInfo = {
                money: club.membershipFee,
                clubId: club._id,
                userEmail: user.email,
                ClubName: club.clubName,
                managerEmail: club.managerEmail,
                location: club.location,
                membershipFee: club.membershipFee,
                status: club.status,
                category: club.category,
                photoUrl: club.photoUrl,
            };

            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            // redirect to Stripe Checkout
            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                throw new Error('No checkout URL returned from server.');
            }
        } catch (err) {
            console.error('Checkout create error:', err);
            Swal.fire({
                title: 'Payment session failed',
                text: 'Unable to start payment. Please try again later.',
                icon: 'error'
            });
        }
    };

    return (
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="max-w-6xl mx-auto py-16 px-4 sm:px-6 perspective-1200"
>
  {/* ---------- Banner ---------- */}
  <motion.div
    whileHover={{ scale: 1.04, rotateX: 6 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="
      relative w-full h-52 sm:h-64
      rounded-2xl overflow-hidden
      shadow-lg mb-8 transform-gpu
    "
  >
    <img
      src={club.photoUrl}
      alt={club.clubName}
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* ---------- Club Info Card ---------- */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    whileHover={{ scale: 1.02, rotateX: 4 }}
    className="
      bg-white p-5 sm:p-6
      rounded-2xl shadow-xl
      flex flex-col gap-6
      transform-gpu
    "
  >
    <div className="flex flex-col md:flex-row gap-6">
      {/* ---------- LEFT ---------- */}
      <div className="flex-1 flex flex-col gap-4">

        {/* Title */}
        <motion.div
          whileHover={{ x: 6 }}
          className="flex items-center gap-2"
        >
          <SiClubforce className="text-2xl" />
          <h2 className="text-2xl font-bold">{club.clubName}</h2>
        </motion.div>

        {/* Category */}
        <motion.div
          whileHover={{ x: 6 }}
          className="flex items-center gap-2"
        >
          <MdCategory className="text-xl text-purple-600" />
          <p className="text-lg font-medium">{club.category}</p>
        </motion.div>

        {/* Meta Info */}
        <div className="mt-2 text-gray-700 space-y-2">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1"
          >
            <FaMapMarkerAlt className="text-red-500" />
            {club.location}
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1"
          >
            <FaMoneyBillWave className="text-green-500" />
            {club.membershipFee || 0} BDT
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1"
          >
            <FaEnvelope className="text-blue-500" />
            {club.managerEmail}
          </motion.span>
        </div>

        {/* Status */}
        <div className="text-lg sm:text-xl">
          <p>Created At: {new Date(club.createdAt).toLocaleString()}</p>
          <p>
            Status:{" "}
            <span
              className={`font-semibold ${
                club.status === "approved"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {club.status}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          {alreadyJoined ? (
            <button
              disabled
              className="
                btn bg-gray-400 text-white text-lg
                rounded-xl px-6 py-2 cursor-not-allowed
              "
            >
              Already Joined
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.08, rotateX: 8 }}
              transition={{ type: "spring", stiffness: 260 }}
              onClick={handleJoin}
              className="
                btn bg-linear-to-l from-[#002455] to-[#8ABEB9]
                text-lg sm:text-xl text-white
                rounded-xl px-6 py-2 transform-gpu
              "
            >
              Join And Pay Now
            </motion.button>
          )}
        </div>
      </div>

      {/* ---------- DESCRIPTION ---------- */}
      <motion.div
        whileHover={{ x: -6 }}
        className="flex-1"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
          About this club:
        </h3>
        <p className="text-gray-900 text-lg sm:text-xl">
          {club.description || "No description available."}
        </p>
      </motion.div>
    </div>

    {/* ---------- Footer Button ---------- */}
    <div className="flex justify-end mt-4">
      <motion.div
        whileHover={{ scale: 1.06, rotateX: 6 }}
        transition={{ type: "spring", stiffness: 260 }}
        className="transform-gpu"
      >
        <Link
          to="/showAllClub"
          className="
            btn bg-linear-to-l from-[#002455] to-[#8ABEB9]
            text-lg sm:text-xl text-white
            rounded-xl px-6 py-2
          "
        >
          Go Back
        </Link>
      </motion.div>
    </div>
  </motion.div>
</motion.div>

    );
};

export default ClubDetail;
