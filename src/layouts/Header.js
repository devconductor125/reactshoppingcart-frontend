import React, { useEffect } from 'react';
import {logoutAuth} from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthorized }) => {

  const dispatch = useDispatch();
  const naviate = useNavigate();
  const {cart} = useSelector(state => state.cart)

  const handleLogout = () => {
    dispatch(logoutAuth());
    naviate('/login')
  }

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch])

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center h-[60px]">
      <div className="logo mx-2 md:mx-6 space-x-6 flex items-end">
        <a href="/" className='text-xl font-bold'>SimpleShop</a>
        {isAuthorized ? (<div className='space-x-4'>
          <a href="/products" className="hover:text-gray-300">Products</a>
        </div>):<></>}
      </div>
      <div className="navigation space-x-4">
        {isAuthorized ? (
          <div className='flex justify-center items-center space-x-4'>
            <a href="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z"/></svg>
              {(cart && cart?.products?.length > 0) ? <div className="absolute top-[-4px] right-[-6px] text-[12px] rounded-xl bg-blue-700 w-[18px] h-[18px] flex justify-center items-center p-1 font-bold">{cart?.products?.length}</div>:<></>}
            </a>
            <button onClick={handleLogout} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Logout</button>
          </div>
        ) : (
          <>
            <a href="/login" className="hover:text-gray-300">Login</a>
            <a href="/signup" className="hover:text-gray-300">Signup</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;