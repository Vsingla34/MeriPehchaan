import React, { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Heart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/user.services';
import SiteFooter from '../layout/Footer.jsx'
import toast from 'react-hot-toast';

export const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submit,setSubmit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
   window.scrollTo({
    top:0
   })
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmit(!submit)

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setSubmit(false)

    try {
      setSubmit(true)
      const response = await userLogin(formData)
      const userString = JSON.stringify(response.data)
      localStorage.setItem('u-',userString)
      toast.success('Login Succecessfully')
      navigate('/')
      setSubmit(!submit)

      

    } catch (err) {
      console.log(err.response.data.message)
      toast.error(err.response.data.message || error )
      setError(err.response.data.message || 'Internal server error !')
      setSubmit(false)

    }

  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4 pt-16 pb-12 ">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Meri Pehchaan</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your journey of making a difference</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
             
              <NavLink
                type="button"
                to='/forgot-p'
                className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                Forgot password?
              </NavLink>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submit}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submit?'Checking...': 'Sign In'}
            </button>
          </form>


          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <NavLink
                onClick={() => onNavigate('signup')}
                to='/signup'
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
              >
                Sign up here
              </NavLink>
            </p>
          </div>
        </div>

     
      </div>
     
    </div>
     <SiteFooter/>
    </>
  );
};

export default Login;