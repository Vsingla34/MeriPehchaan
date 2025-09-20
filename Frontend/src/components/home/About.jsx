import React, { useEffect, useState } from "react";
import { Users, Heart, Target, Award } from "lucide-react";
import Header from "../layout/Navbar";
import SiteFooter from "../layout/Footer";


const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top:0
    })
    const element = document.getElementById("about-section");
    if (!element) {
      console.warn("About section element not found for IntersectionObserver.");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.disconnect();
        }
      },
      {
        
        threshold: 0.2,
      }
    );

   
    observer.observe(element);

    
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every challenge with empathy and understanding, ensuring dignity and respect for all.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We believe in the power of collective action and work hand-in-hand with local communities.",
    },
    {
      icon: Target,
      title: "Impact",
      description:
        "Every action we take is designed to create measurable, lasting positive change.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards in all our programs and operations.",
    },
  ];

  return (
    <>
    <section id="about-section" className="py-20 bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-emerald-600">{"Meri Pehchaan"}</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Meri Pehchaan is a voluntary organisation
              working with vulnerable groups of children. Our NGO endeavors to
              motivate, educate and impart life skills to vulnerable children so
              that they become self reliant.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
               Volunteers of our NGO are versatile
              and from various fields who expertly bring their experience and
              own unique perspective & work together to create a bright future
              for Children & Youth. We have taken a blessed initiative to
              empower the lives of under privileged Children & Youth
            </p>

            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${
                    (index + 1) * 100
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <value.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
               src="https://i.ibb.co/Kpg7K1HP/Gemini-Generated-Image-q4ifnkq4ifnkq4if.png" 
                alt="Community members working together"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                10,000+
              </div>
              <div className="text-sm text-gray-600">Lives Transformed</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </>
  );
};

export default About;
