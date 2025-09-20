import React, { useEffect, useState } from 'react';
import { BookOpen, Stethoscope, Users2, Leaf, ArrowRight, SquareParkingIcon } from 'lucide-react';
import Header from  '../layout/Navbar.jsx'; 
import { useNavigate } from 'react-router-dom';



import * as LucideIcons from 'lucide-react';

const Programs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top:0
    })
    const element = document.getElementById('programs-section');
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      iconName: 'BookOpen', 
      title: 'Education Awareness',
      description: 'Raising awareness about the importance of education and promoting literacy among underserved communities.',
      impact: '8,000+ children educated',
      color: 'emerald',
      image: 'https://i.ibb.co/jPYfvTKJ/education.jpg',
    },
    {
      iconName: 'Stethoscope', 
      title: 'Career Counseling',
      description: 'Guiding youth through career choices, skill development, and future planning to help them achieve their goals.',
      impact: '1,000+ youth counselled',
      color: 'blue',
      image: 'https://i.ibb.co/xVZ743q/Gemini-Generated-Image-1rowqx1rowqx1row.png'
    },
    {
      iconName: 'SquareParkingIcon',
      title: 'Skills Training',
      description: 'Providing vocational and technical training to empower youth with practical skills for employment and entrepreneurship.',
      impact: '5,000 youth trained',
      color: 'cyan',
      image: 'https://i.ibb.co/zVy2B5LW/training.jpg'
    },
    {
      iconName: 'Users2',
      title: 'Women Empowerment',
      description: 'Supporting women through education, leadership development, and financial literacy to foster independence and confidence.',
      impact: '3,000+ women empowered',
      color: 'pink',
      image: 'https://images.pexels.com/photos/8923459/pexels-photo-8923459.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      iconName: 'Leaf',
      title: 'Environmental Protection',
      description: 'Promoting eco-friendly practices, tree planting, and sustainability initiatives to protect and restore the environment.',
      impact: '10,000+ trees planted',
      color: 'green',
      image: 'https://images.pexels.com/photos/4503267/pexels-photo-4503267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  const handleNavigate = (program) => {
    const slug = program.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/d-about/${slug}`, { state: { programData: program } });
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white';
      case 'blue': return 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white';
      case 'cyan': return 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white';
      case 'pink': return 'bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white';
      case 'green': return 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white';
      default: return 'bg-gray-100 text-gray-600 group-hover:bg-gray-600 group-hover:text-white';
    }
  };

  return (
    <>
    <section id="programs-section" className="py-20 bg-white">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our <span className="text-emerald-600">Programs</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            We focus on five key areas to create comprehensive, sustainable change in the communities we serve worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const IconComponent = LucideIcons[program.iconName]; 
            return (
              <div
                key={program.title}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                onClick={() => handleNavigate(program)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${getColorClasses(program.color)}`}>
                    {IconComponent && <IconComponent className="h-6 w-6" />} 
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">{program.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-600">{program.impact}</span>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
   
    </>
  );
};

export default Programs;