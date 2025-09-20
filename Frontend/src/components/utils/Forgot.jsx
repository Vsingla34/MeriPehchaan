import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { generateOtp } from '../../services/user.services';
import toast from 'react-hot-toast';

const Forgot =  () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem('em', email)

    
     
    try {
      const response = await generateOtp(email);
     
      toast.success(response.data.message)
      localStorage.setItem('em',email)
      navigate('/generate-otp')
    } catch (error) {
      console.log(error.response.message)
      setLoading(false)
      toast.error(error.response.data.message)
    }

   
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">HopeForward</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate OTP</h1>
          <p className="text-gray-600">Enter your email to receive a One-Time Password.</p>
        </div>

        {/* Generate OTP Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate OTP'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <NavLink
                to='/login'
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
              >
                Back to Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;