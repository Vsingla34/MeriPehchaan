import React, { useState, useEffect } from 'react';
import { Heart, DollarSign } from 'lucide-react';
import Header from '../layout/Navbar';
import Footer from '../layout/Footer';

const programs = [
  'Education Awareness',
  'Career Counseling',
  'Skills Training',
  'Women Empowerment',
  'Environmental Protection',
];

const dummyDonors = [
  {
    id: 1,
    name: 'Rohan Mehta',
    profilePic: 'https://placehold.co/150x150/E9D5FF/2D3748?text=RM',
    donationAmount: 150000,
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 2,
    name: 'Ananya Gupta',
    profilePic: 'https://placehold.co/150x150/BEE3F8/2D3748?text=AG',
    donationAmount: 50000,
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 3,
    name: 'Suresh Kumar',
    profilePic: 'https://placehold.co/150x150/A7F3D0/2D3748?text=SK',
    donationAmount: 250000,
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 4,
    name: 'Divya Rao',
    profilePic: 'https://placehold.co/150x150/FEE2E2/2D3748?text=DR',
    donationAmount: 10000,
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 5,
    name: 'Karan Singh',
    profilePic: 'https://placehold.co/150x150/FCDDEC/2D3748?text=KS',
    donationAmount: 85000,
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 6,
    name: 'Meena Reddy',
    profilePic: 'https://placehold.co/150x150/C4B5FD/2D3748?text=MR',
    donationAmount: 300000,
    program: programs[Math.floor(Math.random() * programs.length)],
  },
];

const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const sortedDonors = dummyDonors.sort((a, b) => b.donationAmount - a.donationAmount);
        
        setDonors(sortedDonors);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center min-h-screen">
        <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-teal-500 to-blue-600 min-h-screen font-sans">
        <div className="container mx-auto p-4 md:p-8 pt-24 md:pt-32">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-12">
            Meet Our  <span className="text-yellow-400">Donors</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:grid-cols-2">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-500 shadow-md flex-shrink-0">
                    <img
                      src={donor.profilePic}
                      alt={donor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {donor.name}
                    </h2>
                    <div className="flex items-center justify-center sm:justify-start text-gray-500">
                     
                      <span className="text-sm font-semibold">{donor.program}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start text-emerald-600 font-bold mb-2">
                      
                      <span className="text-xl">₹ {donor.donationAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donor;
