import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

import toast from '../../utils/toast'
import { getCart } from "../../slices/cartSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const actionResult = await dispatch(loginUser({username, password}));
    console.log(loginUser.fulfilled.match(actionResult), actionResult)
    if(loginUser.fulfilled.match(actionResult)){
      await dispatch(getCart());
      navigate('/')
    } else {
      console.log(actionResult)
      toast.info(actionResult.payload.msg);
    }
  }

  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <div className="space-y-6" action="#">
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;