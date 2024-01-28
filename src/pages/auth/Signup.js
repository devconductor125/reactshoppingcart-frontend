import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../slices/authSlice";

import toast from '../../utils/toast'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const actionResult = await dispatch(signupUser({username, password, confirmPassword: confirmPwd, userType: 'client'}));
    console.log(signupUser.fulfilled.match(actionResult), actionResult);
    if (signupUser.fulfilled.match(actionResult)) {
      navigate('/');
    } else {
      toast.info(actionResult.payload.msg);
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            And start your journey with us
          </p>
        </div>
          <input
            type="text"
            name="username"
            value={username}
            id="username"
            autoComplete="username"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
           <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={password}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="confirm"
            required
            value={confirmPwd}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Retype Password"
            onChange={e => setConfirmPwd(e.target.value)}
          />
          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;