import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';


const Login = () => {
    const Axios = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const { Login, ForgetPasssword, Google } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const handleEye = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    const heandleFrom = (data) => {
        Login(data.email, data.password)
            .then(() => {
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                console.log(error)
            })

    }
    const handleForget = () => {
        const email = getValues("email");

        if (!email) {
            toast("Please enter your email first!");
            return;
        }

        ForgetPasssword(email)
            .then(() => {
                toast("Password reset email sent! Check your inbox.");
            })
            .catch(err => {
                console.log(err.message);
            });
    };
    const heandleFormGoogle = () => {
        Google()
            .then(result => {

                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }
                Axios.post('/users', userInfo)
                    .then(()=> {
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
       <div className="hero min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
  {/* Perspective wrapper */}
  <div className="perspective-1000 w-full max-w-sm">
    <div
      className="
        card bg-gradient-to-tr from-gray-800 to-gray-900 w-full shadow-2xl
        transform transition-all duration-500 ease-out
        hover:rotate-x-6 hover:-rotate-y-6 hover:scale-[1.03]
        hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]
        border border-gray-700
      "
    >
      <div className="card-body">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          Login now!
        </h1>

        <form onSubmit={handleSubmit(heandleFrom)}>
          <fieldset className="space-y-3">

            {/* Email */}
            <label className="label text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Password */}
            <label className="label text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Must contain at least one uppercase & one lowercase letter",
                  },
                })}
                className="input input-bordered w-full pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
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
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* Forgot */}
            <button
              type="button"
              onClick={handleForget}
              className="text-blue-400 text-sm hover:underline"
            >
              Forgot password?
            </button>

            {/* Login */}
            <button className="btn w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg mt-3 hover:scale-105 transform transition duration-300 shadow-lg">
              Login
            </button>

            <p className="text-center text-sm text-gray-400 mt-2">
              Don’t have an account?
              <Link
                to="/auth/regester"
                className="text-blue-400 underline ml-1 hover:text-blue-500"
              >
                Register Now
              </Link>
            </p>
          </fieldset>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Google */}
        <button
          onClick={heandleFormGoogle}
          className="btn w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 transform transition duration-300 shadow-lg"
        >
          <FcGoogle className="text-xl mr-2" /> Login with Google
        </button>
      </div>

      <ToastContainer />
    </div>
  </div>
</div>



    );
};

export default Login;