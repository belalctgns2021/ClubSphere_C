import React from 'react';
import WebSideLogo from '../WebSideLogo/WebSideLogo';
import { Link } from 'react-router';
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WebSideLogo from "./WebSideLogo";
const Footer = () => {
    // Define the author/social links centrally for clean mapping
    const socialLinks = [
        { icon: FaFacebookSquare, url: 'https://www.facebook.com/lv.fahim.78750', label: 'Facebook' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/md-fahim-numan/', label: 'LinkedIn' },
        { icon: FaSquareGithub, url: 'https://github.com/lvfahim', label: 'GitHub' },
    ];

    return (
        

const Footer = ({ socialLinks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        rounded-2xl bg-base-300 mt-16 shadow-lg
        hover:shadow-2xl transition-all duration-300
      "
    >
      <footer
        className="
          footer w-11/12 mx-auto p-10
          text-base-content
          flex flex-col sm:flex-row justify-between gap-10
        "
      >
        {/* ---------- LOGO ---------- */}
        <motion.div
          whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="flex flex-col items-center sm:items-start transform-gpu"
        >
          <Link to="/" className="mb-4">
            <WebSideLogo />
          </Link>
          <p className="text-sm text-gray-500 text-center sm:text-left">
            ClubVerse, built for communities. <br />
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>

        {/* ---------- SERVICES ---------- */}
        <motion.nav
          whileHover={{ y: -5 }}
          className="space-y-2 text-center sm:text-left"
        >
          <h6 className="footer-title">Services</h6>
          {["Branding", "Design", "Marketing", "Advertisement"].map(
            (item, i) => (
              <motion.a
                key={i}
                whileHover={{ x: 6, scale: 1.05 }}
                className="link link-hover block"
              >
                {item}
              </motion.a>
            )
          )}
        </motion.nav>

        {/* ---------- COMPANY ---------- */}
        <motion.nav
          whileHover={{ y: -5 }}
          className="space-y-2 text-center sm:text-left"
        >
          <h6 className="footer-title">Company</h6>
          {["About us", "Contact", "Jobs", "Press kit"].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ x: 6, scale: 1.05 }}
              className="link link-hover block"
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>

        {/* ---------- SOCIAL ---------- */}
        <motion.nav className="text-center sm:text-left">
          <h6 className="footer-title">Connect with Author</h6>
          <div className="flex justify-center sm:justify-start gap-4 mt-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{
                  scale: 1.25,
                  rotateY: 15,
                  rotateX: -15,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="
                  text-gray-700 hover:text-indigo-600
                  transform-gpu
                "
              >
                <link.icon className="text-3xl" />
              </motion.a>
            ))}
          </div>
        </motion.nav>
      </footer>
    </motion.div>


    );
};

export default Footer;