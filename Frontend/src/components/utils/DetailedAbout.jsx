import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import Header from "../layout/Navbar.jsx";
import * as LucideIcons from "lucide-react";
import SiteFooter from "../layout/Footer.jsx";
import { updateUserProfile } from "../../services/user.services.js";
import { toast } from "react-hot-toast";


const styles = {
    
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          
}

const DetailedAbout = () => {
  const userData = JSON.parse(localStorage.getItem("u-"));
  const location = useLocation();
  const [submit, setSubmit] = useState(false);
  const { slug } = useParams();
  const programData = location.state?.programData;
  const IconComponent = programData ? LucideIcons[programData.iconName] : null;
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  const handleDonationNavigation = () => {
    if (!userData || userData.user._id === undefined) {
      navigate("/login");
      return;
    }
    navigate('/donate');
  };

  const handleProgramChange = async () => {
    if (!userData || userData.user._id === undefined) {
      navigate("/login");
      return;
    }
    const data = {
      id: userData.user._id,
      program: programData.title,
    };

    setSubmit(true);
    try {
      const response = await updateUserProfile(data);
        setTimeout(() => {
        setSubmit(false);
         toast.success(response.data.message);
      }, 1000);
     
      const updatedUserData = response.data;

      localStorage.setItem("u-", JSON.stringify(updatedUserData));
    } catch (err) {
      console.log(err.response.data.message,styles);
      toast.error(err.response.data.message)
      setSubmit(false);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-600",
      text: "text-emerald-600",
      lightBg: "bg-emerald-50",
      border: "border-emerald-600",
    },
    blue: {
      bg: "bg-blue-600",
      text: "text-blue-600",
      lightBg: "bg-blue-50",
      border: "border-blue-600",
    },
    cyan: {
      bg: "bg-cyan-600",
      text: "text-cyan-600",
      lightBg: "bg-cyan-50",
      border: "border-cyan-600",
    },
    pink: {
      bg: "bg-pink-600",
      text: "text-pink-600",
      lightBg: "bg-pink-50",
      border: "border-pink-600",
    },
    green: {
      bg: "bg-green-600",
      text: "text-green-600",
      lightBg: "bg-green-50",
      border: "border-green-600",
    },
  };

  const theme = colorClasses[programData?.color] || colorClasses["emerald"];

  if (!programData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <LucideIcons.AlertTriangle className="mx-auto h-16 w-16 text-red-400" />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">
            Error: Program Data Not Found
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            This page could not load the details for "{slug}".
          </p>
          <p className="mt-2 text-gray-600">
            This can happen if you access the URL directly. Please start from
            the programs page.
          </p>
          <Link
            to="/programs"
            className="mt-10 inline-block bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
          >
            Back to All Programs
          </Link>
        </div>
      </div>
    );
  }

  
  const currentRaised = 15250; 
  const goalAmount = 50000; 
  const progress = Math.min((currentRaised / goalAmount) * 100, 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src={programData.image}
            alt={programData.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
              isAnimated ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="max-w-4xl">
              <div
                className={`flex items-center gap-3 w-fit p-2 px-4 mb-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-500 ease-out ${
                  isAnimated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {IconComponent && (
                  <IconComponent className="h-6 w-6 text-white" />
                )}
                <p className="font-semibold text-white">Program</p>
              </div>
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight shadow-lg transition-all duration-500 ease-out ${
                  isAnimated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {programData.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 transition-all duration-500 ease-out ${
                isAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                  About The Initiative
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-10">
                  {programData.description}
                </p>

                {/* Donation Goal Section */}
                <div
                  className={`bg-white rounded-2xl shadow-xl p-8 border-t-4 ${
                    theme.border
                  } transform transition-all duration-700 ease-out ${
                    isAnimated
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <h3 className={`text-3xl font-bold mb-4 ${theme.text}`}>
                    Our Funding Goal
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-800">
                      Raised: ₹{currentRaised.toLocaleString()}
                    </span>
                    <span className="text-lg font-semibold text-gray-800">
                      Goal: ₹{goalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className={`h-3 rounded-full ${theme.bg} transition-all duration-1000 ease-out`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Help us reach our target to ensure this program continues to
                    make a difference.
                  </p>
                  <button
                    onClick={handleDonationNavigation}
                    className={`inline-flex items-center justify-center text-center text-white font-bold py-3 px-8 rounded-lg ${theme.bg} hover:opacity-90 transition-all duration-300 transform hover:scale-105 group`}
                  >
                    Donate Now
                    <LucideIcons.ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                {/* End Donation Goal Section */}
              </div>
              <aside className="lg:col-span-1">
                <div
                  className={`bg-white rounded-2xl shadow-xl p-6 border-t-4 ${theme.border}`}
                >
                  <h3 className={`text-2xl font-bold mb-4 ${theme.text}`}>
                    Key Impact
                  </h3>
                  <div className="flex items-center gap-4">
                    {IconComponent && (
                      <IconComponent className={`h-8 w-8 ${theme.text}`} />
                    )}
                    <p className="text-lg font-semibold text-gray-800">
                      {programData.impact}
                    </p>
                  </div>
                  <button
                    onClick={handleProgramChange}
                    disabled={submit}
                    className={`w-full  mt-6 inline-block text-center text-white font-bold py-3 px-6 rounded-lg ${theme.bg} hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed `}
                  >
                    {submit ? "Updating..." : "Support This Program"}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default DetailedAbout;
