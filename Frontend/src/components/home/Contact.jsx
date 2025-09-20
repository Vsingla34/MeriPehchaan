import React, { useState, useEffect } from "react";
import Header from "../layout/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { sendMsg } from "../../services/contact.service";
import toast from 'react-hot-toast'
import SiteFooter from '../layout/Footer.jsx'


const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState('')
  const navigate = useNavigate()
 
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    message:''
  })

  useEffect(() => {
    window.scrollTo({
      top:0
    })

      resetForm()
    

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const resetForm = ()=>{
    formData.name = ''
    formData.email = ''
    formData.message = ''
  }


  const handleChange =  (e)=>(
    setFormData(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  )

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setErr('')
    setSubmit(true)
    if (formData.message < 10) {
      setErr("Message should be aleast 10 characters !")
      setSubmit(false)
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }
   
    setSubmit(true)
    try {
      const response = await sendMsg(data)
      
      toast.success(response.data.message)
      resetForm()
      setSubmit(false)
      navigate('/gr-')

      
      

    } catch (error) {
      console.log(error)
      setSubmit(false)
      toast.error(error.response.data.message)
      setErr(error.response.data.message)
    }
   
  }


  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h1
              className={`text-4xl md:text-6xl font-extrabold text-gray-800 transition-all ease-in-out duration-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Get in Touch
            </h1>
            <p
              className={`mt-4 text-lg text-gray-600 transition-all ease-in-out duration-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              We'd love to hear from you. Please fill out the form below or use
              our contact details.
            </p>
          </div>

          <div
            className={`
              bg-white rounded-2xl shadow-xl max-w-5xl mx-auto p-8 md:p-12 
              transition-all ease-in-out duration-700 
              ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
            `}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <form>
                  {err.length > 2 && <h1 className="text-red-800 px-5 py-2 mb-10 rounded-[2px] bg-red-100 border-[0.5px] border-red-200 ">{err}</h1>}
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      
                      
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="Your Name"
                     
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submit}
                  >
                  {submit? 'Submitting...':'Submit'}
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Contact Information
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-700">Address</h4>
                        <p className="text-gray-600">
                          201 second floor building No-80, near Jain school
                          uniform Pillar No-52, Laxmi Nagar, Delhi - 110092
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-700">Phone</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-700">Email</h4>
                        <p className="text-gray-600">meripehchaan@gmail.com</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <NavLink
                  className="mt-8"
                  to="https://www.google.com/maps/search/201+second+floor+building+No-80,+near+Jain+school+uniform+Pillar+No-52,+Laxmi+Nagar,+Delhi+-+110092/@28.6348684,77.2829399,20.25z?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
                >
                  <img
                    src="https://i.ibb.co/mC4Gd8Vv/Screenshot-31.png"
                    alt="Map location"
                    className="rounded-lg shadow-sm"
                  />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter/>
    </div>
  );
};

export default Contact;
