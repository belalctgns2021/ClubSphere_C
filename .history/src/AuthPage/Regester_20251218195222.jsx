import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';


const Regester = () => {
    const Axios = useAxiosSecure()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const { Register, setUser, UpData, Google } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const handleEye = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    const heandleFrom = (data) => {
        const profileImg = data.photo[0]
        Register(data.email, data.password)
            .then(result => {

                const formData = new FormData();
                formData.append('image', profileImg)
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`
                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res?.data?.data?.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        Axios.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })
                        const userProfile = {
                            displayName: data.name,
                            photoURL:photoURL
                        }

                        UpData(userProfile)
                            .then(() => { })
                            .catch(error => console.log(error))
                    })
                setUser(result)
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                console.log(error)
            })

    }
    const heandleFormGoogle = () => {
        Google()
            .then(result => {
                  const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                Axios.post('/users', userInfo)
                    .then(() => {
                        navigate(location.state || '/');
                    })
                Swal.fire({
                    title: "Login Susseccfully",
                    icon: "success",
                    draggable: true
                });
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                console.log(error)
                toast('Google login failed. Please try again.')
            })
    }
    return (
        <div className="hero bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center px-4">
  {/* 3D Perspective wrapper */}
  <div className="perspective-1000 w-full max-w-md">
    <motion.div
      className="
        card bg-gradient-to-tr from-gray-800 to-gray-900 w-full shadow-2xl
        transform transition-all duration-500 ease-out
        hover:rotate-x-3 hover:-rotate-y-3 hover:scale-[1.03]
        border border-gray-700
        rounded-3xl
      "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="card-body text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Register Now!</h1>
        <form onSubmit={handleSubmit(heandleFrom)}>
          <fieldset className="space-y-4">

            {/* Name */}
            <label className="label text-gray-300">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Name"
            />
            {errors.name?.type === 'required' &&
              <p className='text-red-500 text-sm'>Name is required</p>}

            {/* Photo */}
            <label className="label text-gray-300">Photo</label>
            <input
              type="file"
              {...register('photo', { required: true })}
              className="file-input w-full bg-gray-800 border-gray-600 text-white"
            />
            {errors.photo?.type === 'required' &&
              <p className='text-red-500 text-sm'>Photo is required</p>}

            {/* Email */}
            <label className="label text-gray-300">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
            />
            {errors.email?.type === 'required' &&
              <p className='text-red-500 text-sm'>Email is required</p>}

            {/* Password */}
            <label className="label text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Must contain at least one uppercase & one lowercase letter"
                  }
                })}
                className="input w-full pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={handleEye}
                className="absolute right-3 top-3 text-xl text-gray-400 hover:text-blue-400 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {/* Register Button */}
            <button className="btn w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg mt-4 hover:scale-105 transform transition duration-300 shadow-lg">
              Register
            </button>

            <p className="text-center text-gray-400 mt-2">
              Already have an account?
              <Link to='/auth/login' className='text-blue-400 underline ml-1 hover:text-blue-500'>
                Login Now
              </Link>
            </p>
          </fieldset>
        </form>

        {/* Divider */}
        <div className='flex items-center gap-2 my-4'>
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={heandleFormGoogle}
          className='btn w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 transform transition duration-300 shadow-lg flex items-center justify-center gap-2'
        >
          <FcGoogle className="text-xl" /> Login With Google
        </button>
      </div>
    </motion.div>
  </div>

  <ToastContainer />
</div>

    );
};

export default Regester;