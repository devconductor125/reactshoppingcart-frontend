import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className='flex items-center space-x-6'>
            <a href="/" className="text-lg font-bold">
              SimpleShop
            </a>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} SimpleShop. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-gray-400">About</span>
            <span className="hover:text-gray-400">Terms</span>
            <span className="hover:text-gray-400">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;