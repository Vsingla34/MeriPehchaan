import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyOtp } from '../../services/user.services';


const Otp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Filter out any non-numeric characters and limit the length
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP.');
      setLoading(false);
      return;
    }

    

    const email = localStorage.getItem('em')

 
    

    try {
      
     const response = await verifyOtp({email,otp});
      
      toast.success(response.data.message);
      localStorage.removeItem('em-')
     
      navigate('/reset-pass')
      
      
      
    } catch (err) {
      console.error('OTP verification error:', err);
      toast.error(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
       
       navigate('/forgot-p')

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">HopeForward</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h1>
          <p className="text-gray-600">Enter the One-Time Password sent to your email.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                One-Time Password
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleChange}
                  pattern="\d*" 
                  inputMode="numeric"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

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

export default Otp;