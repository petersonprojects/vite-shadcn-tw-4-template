/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, selectUserLoggedIn } from '../../main';
import { Navigate, Link } from "react-router-dom";
// import GoogleSignInButton from "./GoogleSignInButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectUserLoggedIn);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const deviceId = `${Math.floor(Math.random() * 1000) + 1}`;
    const data = { username, password, deviceId };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      

      const responseData = await response.json();
      
      const { userId, accessToken, username } = responseData;

      const roleIdGetResponse = await fetch(`/api/${userId}/role`, {
        method: 'GET'
      });

      const roleIdData = await roleIdGetResponse.json();

      console.log("roleIdGetResponse: ", roleIdData);

      if (userId) {
        localStorage.setItem('userData', JSON.stringify({ loggedIn: true, userId, accessToken, username }));
        localStorage.setItem("accessToken", accessToken);
        dispatch(loginSuccess({ loggedIn: true, userId, accessToken, username, role:  roleIdData.roleId }));

      } else {

        alert(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    loggedIn ? <Navigate to="/" /> :
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">PT Leagues Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()} // Prevents button from taking focus
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full">
                {/* <GoogleSignInButton /> */}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link className="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium" to={"/registration"}>Sign Up</Link>
          </p>
        </div>
      </div>
  );
};

export default LoginForm;
