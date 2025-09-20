import React from 'react';
import { CheckCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Thankyou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="w-full max-w-xl bg-white p-8 md:p-12 rounded-xl shadow-2xl text-center animate-fade-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-emerald-500" strokeWidth={1.5} />
        </div>

        {/* Heading and Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Your inquiry has been successfully submitted.
          <br />
          We will get back to you shortly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <NavLink 
          to='/'
          className="w-full md:w-auto px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-transform transform hover:scale-105">
            Go to Homepage
          </NavLink>
          <NavLink 
          to='/programs'
          className="w-full md:w-auto px-6 py-3 border-2 border-emerald-500 text-emerald-500 font-medium rounded-lg hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-transform transform hover:scale-105">
            See Programs
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
