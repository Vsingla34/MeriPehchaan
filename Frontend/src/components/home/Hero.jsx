import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import Video from './Video';


const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoBox, setVideoBox] = useState(false)

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
   
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 pt-16"
    >

      {videoBox? 
      <Video
      toggleVideo={videoBox}
      setVideoBox={setVideoBox}
      /> 
      
      : ''
      }

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Community helping hands"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-blue-600/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building a Better
            <span className="block text-yellow-300">Tomorrow Together</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us in our mission to create lasting change in communities worldwide through 
            education, healthcare, and sustainable development initiatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            
           
            <Link
              to="/programs"
              className="group bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>Get Involved</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <button 
            onClick={()=>setVideoBox(!videoBox)}
            className="group flex items-center space-x-3 text-white hover:text-yellow-300 transition-colors duration-300">
              <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                <Play className="h-6 w-6 ml-1" />
              </div>
              <span className="text-lg font-medium">Watch Our Work</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Lives Impacted' },
              { number: '1000+', label: 'Youth Counciled' },
              { number: '20+', label: 'Active Projects' },
              { number: '13', label: 'Years of Service' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;