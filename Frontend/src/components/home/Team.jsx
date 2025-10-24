import React, { useState, useEffect } from 'react';
import Header from '../layout/Navbar';
import SiteFooter from '../layout/Footer';

const Team = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      name: "Vishal Singla",
      profile: "President & Founder",
      description: "Provides the vision and leadership that drives our mission, ensuring our strategic goals are met with passion and purpose.",
      url: "https://i.ibb.co/wZnY42Hh/Vishal.jpg"
    },
    {
      name: "Naveen Jawala",
      profile: "Founder",
      description: "Manages our financial health with meticulous care, ensuring our long-term sustainability and responsible use of funds.",
      url: "https://i.ibb.co/XZZ6yTJQ/Whats-App-Image-2025-09-05-at-12-46-18-PM.jpg"
    },
    
    {
      name: "Pankaj Goyal",
      profile: "Founder",
      description: "Builds and nurtures our relationship with the communities we serve, fostering trust and ensuring their voices are heard.",
      url: "https://i.ibb.co/q3XJZ7td/pankaj-Goy.png"
    },
    
    {
      name: "Gaurav Aggarwal",
      profile: "Founder",
      description: "Drives strategic partnerships and resource mobilization, ensuring the scalability and reach of our initiatives.",
      url: "https://i.ibb.co/kb4RGpq/gaurav-Agg.png"
    },
    
    {
      name: "Ashok Singhal",
      profile: "Founder",
      description: "Provides invaluable guidance and strategic insights, leveraging years of experience to help shape our long-term vision.",
      url: "https://i.ibb.co/4xWNrKD/Ashok-Singhal.png"
    },
    {
      name: "Lalit Aggarwal",
      profile: "Founder",
      description: "Leads our digital transformation efforts, implementing innovative tech solutions to enhance our operational efficiency and outreach.",
      url: "https://i.ibb.co/1YrRDgps/lalit-Aggarwal.png"
    },
    {
      name: "Anil Singhal",
      profile: "Founder",
      description: "Oversees all internal operations, ensuring our projects run smoothly and efficiently to maximize our on-the-ground impact.",
      url: "https://i.ibb.co/cSGczYBF/Whats-App-Image-2025-09-05-at-1-15-57-PM.jpg"
    },
    {
      name: "Prabhav Aggarwal",
      profile: "Founder",
      description: "Spearheads program development and impact measurement, ensuring our solutions are innovative, effective, and scalable.",
      url: "https://i.ibb.co/QvywZdMy/1000034174-removebg-preview.png"
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <section
        className="relative pt-20 pb-40 md:pb-60 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/FLgMJy74/Gemini-Generated-Image-q1oz4hq1oz4hq1oz.png"
            alt="Abstract background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center pt-16 md:pt-24">
          <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight transition-all ease-in-out duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Meet The People
          </h1>
          <h2
            className={`text-5xl md:text-7xl font-extrabold leading-tight mt-4 transition-all ease-in-out duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '150ms' }}
          >
            Behind The <span className="inline-block px-4 py-2 bg-yellow-400 rounded-lg text-gray-900 shadow-md transform -rotate-1">Mission</span>
          </h2>
        </div>
      </section>

      <section className="relative z-20 -mt-28 md:-mt-40 pb-20">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 justify-items-center">
            
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`
                  bg-white rounded-xl shadow-lg p-6 w-full max-w-xl flex items-center gap-6
                  transform hover:-translate-y-2 hover:duration-300 ease-in-out
                  transition-all ease-in-out duration-700
                  ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
                `}
                style={{ transitionDelay: `${250 + index * 150}ms` }}
              >
                <img
                  src={member.url}
                  alt={`Portrait of ${member.name}`}
                  className="w-28 h-28 rounded-full object-cover object-top border-4 border-gray-100 shadow-sm flex-shrink-0"
                />
                
                <div className="text-left flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-2">{member.profile}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <SiteFooter/>
    </div>
  );
};

export default Team;