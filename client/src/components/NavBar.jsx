// components/NavBar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1
          className="text-white text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          Sensor Deploy Portal
        </motion.h1>
        <div className="flex items-center space-x-2">
          <span className="text-blue-200">Admin Portal</span>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;