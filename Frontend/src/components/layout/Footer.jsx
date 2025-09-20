import React, { useState } from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SiteFooter = () => {
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const user =  JSON.parse(localStorage.getItem('u-'))
  const [email, setEmail] = useState('');
  const links = [
    {name:'About Us',to:'/about'},
    {name:'Our Programs', to:'/programs'},
    {name:'Get Involved', to:'/donate'},
    {name:'success and stories', to:'/impact'},
    {name:'news and updates', to:'/'}
  ]

  const handleSubscribeClick = () => {
    try {
      const id = user.user._id
     
    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold">Meri Pehchaan</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering communities and transforming lives through sustainable development,
              education, and compassionate care.
            </p>
            <div className="flex space-x-4">
              <NavLink to='https://www.facebook.com/meripehchaanngo' aria-label="Facebook" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </NavLink>
              <NavLink to='https://twitter.com' aria-label="Twitter" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </NavLink>
              <NavLink to='https://instagram.com' aria-label="Instagram" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </NavLink>
              <NavLink to='https://linkedin.com' aria-label="LinkedIn" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </NavLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink 
                  to={link.to}
                  className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Programs</h3>
            <ul className="space-y-2">
              {['Education Awareness', 'Career Counsiling', 'Skills Training', 'Women Empowerment', 'Environmental Protection'].map((program) => (
                <li key={program}>
                  <NavLink 
                  to='/programs' 
                  className="text-gray-300 hover:text-emerald-500 transition-colors duration-300">
                    {program}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  201 second floor building <br/> No-80, near Jain school uniform<br />
                  Pillar No-52, Laxmi Nagar,<br/> Delhi - 110092
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-300">meripehchaan@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and impact stories.</p>
            <div className="flex">
              <label htmlFor="email-newsletter" className="sr-only">Email for newsletter</label>
              <input
                id="email-newsletter"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-emerald-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="button" 
                onClick={handleSubscribeClick}
                className="bg-emerald-600 text-white px-6 py-2 rounded-r-md hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-500"
              >
                Subscribe
              </button>
            </div>
            
            <div className="h-6 mt-2">
              {newsletterMessage && (
                <p className="text-emerald-400 text-sm">{newsletterMessage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Meri Pehchaan NGO. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

