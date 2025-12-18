import React from 'react';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { Link } from 'react-router';
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {
    // Define the author/social links centrally for clean mapping
    const socialLinks = [
        { icon: FaFacebookSquare, url: 'https://www.facebook.com', label: 'Facebook' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/', label: 'LinkedIn' },
        { icon: FaSquareGithub, url: 'https://github.com/', label: 'GitHub' },
    ];

    return (
        <div className='rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-700 mt-16 shadow-xl transform-gpu perspective-1000'>
    <footer className="footer w-10/12 mx-auto p-10 text-white flex flex-col sm:flex-row justify-between">

        {/* 1. Logo/Brand Section */}
        <div className="flex flex-col items-center sm:items-start mb-8 sm:mb-0">
            <Link to='/' className="mb-4 transform-gpu hover:scale-105 hover:rotateX-2 hover:rotateY-2 transition-transform duration-300">
                <WebSideLogo />
            </Link>
            <p className="text-sm text-gray-300">
                ClubVerse, built for PH. <br />
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </div>

        {/* 2. Services Navigation */}
        <nav className="mb-6 sm:mb-0">
            <h6 className="footer-title text-yellow-400">Services</h6>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Branding</a>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Design</a>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Marketing</a>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Advertisement</a>
        </nav>

        {/* 3. Company Navigation */}
        <nav className="mb-6 sm:mb-0">
            <h6 className="footer-title text-yellow-400">Company</h6>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">About us</a>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Contact</a>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Jobs</a>
            <a className="link link-hover text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-105 transition-transform duration-200">Press kit</a>
        </nav>

        {/* 4. Social Links */}
        <nav>
            <h6 className="footer-title text-yellow-400">Connect with Author</h6>
            <div className="grid grid-flow-col gap-4">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="text-gray-200 hover:text-yellow-400 transform-gpu hover:scale-110 hover:-rotate-3 transition-transform duration-300"
                    >
                        <link.icon className='text-3xl' />
                    </a>
                ))}
            </div>
        </nav>

    </footer>
</div>

    );
};

export default Footer;