import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import Header from "../layout/Navbar";
import Footer from "../layout/Footer";

const programs = [
  "Education Awareness",
  "Career Counseling",
  "Skills Training",
  "Women Empowerment",
  "Environmental Protection",
];

const dummyVolunteers = [
  {
    id: 1,
    name: "Priya Sharma",

    profilePic: "https://placehold.co/150x150/E9D5FF/2D3748?text=PS",
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 2,
    name: "Rajesh Kumar",

    profilePic: "https://placehold.co/150x150/BEE3F8/2D3748?text=RK",
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 3,
    name: "Anjali Singh",

    profilePic: "https://placehold.co/150x150/A7F3D0/2D3748?text=AS",
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 4,
    name: "Siddharth Patel",

    profilePic: "https://placehold.co/150x150/FEE2E2/2D3748?text=SP",
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 5,
    name: "Kavita Das",

    profilePic: "https://placehold.co/150x150/FCDDEC/2D3748?text=KD",
    program: programs[Math.floor(Math.random() * programs.length)],
  },
  {
    id: 6,
    name: "Vikas Gupta",

    profilePic: "https://placehold.co/150x150/C4B5FD/2D3748?text=VG",
    program: programs[Math.floor(Math.random() * programs.length)],
  },
];

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setVolunteers(dummyVolunteers);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
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
            Meet Our <span className="text-yellow-400">Volunteer's</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="bg-white backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-emerald-500 shadow-md">
                    <img
                      src={volunteer.profilePic}
                      alt={volunteer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {volunteer.name}
                  </h2>
                  <div className="flex flex-col items-center space-y-1 text-gray-500 mb-2">
                    <span className="text-sm font-bold ">
                      {volunteer.program}
                    </span>
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

export default Volunteer;
