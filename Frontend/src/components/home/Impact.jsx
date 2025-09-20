import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Globe, Heart, Award, Quote } from 'lucide-react';
import Header from '../layout/Navbar';


const useAnimatedCounter = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = endValue;
          if (start === end) return;

          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          
          if(elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.5 } 
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [endValue, duration]);
  
  return { count, elementRef };
};

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const element = document.getElementById('impact-section');
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { count: livesCount, elementRef: livesRef } = useAnimatedCounter(10000);
  const { count: countriesCount, elementRef: countriesRef } = useAnimatedCounter(1000);
  const { count: projectsCount, elementRef: projectsRef } = useAnimatedCounter(20);
  const { count: volunteersCount, elementRef: volunteersRef } = useAnimatedCounter(1500);

  const stats = [
    { icon: Heart, count: livesCount, ref: livesRef, label: 'Lives Impacted', suffix: '+', color: 'text-red-500', bgColor: 'bg-red-100' },
    { icon: Globe, count: countriesCount, ref: countriesRef, label: 'Youth Counciled', suffix: '+', color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { icon: TrendingUp, count: projectsCount, ref: projectsRef, label: 'Active Projects', suffix: '+', color: 'text-emerald-500', bgColor: 'bg-emerald-100' },
    { icon: Award, count: volunteersCount, ref: volunteersRef, label: 'Volunteers', suffix: '+', color: 'text-purple-500', bgColor: 'bg-purple-100' }
  ];

  const [isMariaStoryVisible, setIsMariaStoryVisible] = useState(false);

  return (
    <>
    <section id="impact-section" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header/>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our <span className="text-emerald-600">Impact</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Every day, we work to create meaningful change in communities around the world. Here's a glimpse of what we've accomplished together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center transform hover:-translate-y-2 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className={`${stat.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div ref={stat.ref} className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.count.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-1000 delay-600 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div 
              className="relative h-96 w-full mx-auto rounded-2xl shadow-2xl overflow-hidden group"
              onMouseEnter={() => setIsMariaStoryVisible(true)}
              onMouseLeave={() => setIsMariaStoryVisible(false)}
            >
              <img 
                src="https://i.ibb.co/QFYQ5p9g/unnamed.png" 
                alt="Maria's Journey" 
                className={`absolute inset-0 w-full h-full object-cover rounded-2xl 
                            transition-all duration-700 ease-in-out 
                            ${isMariaStoryVisible ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`} 
              />
              
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl 
                            transition-opacity duration-500 ease-in-out
                            ${isMariaStoryVisible ? 'opacity-0' : 'opacity-100'}`} 
              />
              <div 
                className={`absolute bottom-6 left-6 text-white 
                            transition-opacity duration-500 ease-in-out
                            ${isMariaStoryVisible ? 'opacity-0' : 'opacity-100'}`}
              >
                <h4 className="text-xl font-semibold mb-2">Maria's Education Journey</h4>
                <p className="text-sm opacity-90">From rural village to university graduate</p>
              </div>

              <div 
                className={`absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white text-gray-800 flex flex-col justify-center
                            transition-all duration-700 ease-in-out overflow-hidden
                            ${isMariaStoryVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              >
                <Quote className="absolute top-4 right-4 h-24 w-24 text-emerald-100 transform -rotate-12" />
                <div className="relative z-10">
                    <h4 className="text-3xl font-bold text-emerald-700 mb-4 tracking-tight">An Inspiring Journey</h4>
                    <p className="text-lg leading-relaxed text-gray-600">
                        Maria grew up in a small village where education was a distant dream. Our "Education Awareness" program reached her community, providing a scholarship and safe transport.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        She became the first in her family to attend university. Today, <span className="font-semibold text-emerald-600">Maria is back in her village as a teacher,</span> building a brighter future for the next generation.
                    </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg"><div className="flex items-start space-x-4"><div className="bg-emerald-100 p-2 rounded-lg"><Heart className="h-5 w-5 text-emerald-600" /></div><div><h4 className="font-semibold text-gray-900 mb-2">Over 10,000 children educated</h4><p className="text-gray-600 text-sm">Our initiative brought quality education and resources to thousands of children through our awareness programs.</p></div></div></div>
              <div className="bg-white p-6 rounded-xl shadow-lg"><div className="flex items-start space-x-4"><div className="bg-blue-100 p-2 rounded-lg"><TrendingUp className="h-5 w-5 text-blue-600" /></div><div><h4 className="font-semibold text-gray-900 mb-2">Women's Microfinance Success</h4><p className="text-gray-600 text-sm">Over 1,000 women started their own businesses through our microfinance program.</p></div></div></div>
              <div className="bg-white p-6 rounded-xl shadow-lg"><div className="flex items-start space-x-4"><div className="bg-green-100 p-2 rounded-lg"><Globe className="h-5 w-5 text-green-600" /></div><div><h4 className="font-semibold text-gray-900 mb-2">Reforestation Impact</h4><p className="text-gray-600 text-sm">10,000 trees planted, helping combat climate change and restore local ecosystems.</p></div></div></div>
            </div>
          </div>
        </div>
      </div>
   </section>
   
   </>
  );
};

export default Impact;