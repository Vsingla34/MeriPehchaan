import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import About from './components/home/About.jsx'
import Impact from './components/home/Impact.jsx'
import Programs from './components/home/Programs.jsx'
import MainPage from './components/home/MainPage'
import Contact from './components/home/Contact.jsx'
import Team from './components/home/Team.jsx'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'

import Donation from './components/utils/Donation.jsx'
import DetailedAbout from './components/utils/DetailedAbout.jsx'
import { Toaster } from 'react-hot-toast'
import Forgot from './components/utils/Forgot.jsx'
import Otp from './components/utils/Otp.jsx'
import ChangePass from './components/utils/ChangePass.jsx'
import Dashboard from './components/utils/Dashboard.jsx'
import Thankyou from './components/utils/Thankyou.jsx'
import Volunteer from './components/home/Volunteer.jsx'
import Donor from './components/home/Donor.jsx'
import SignUpOtpVerification from './components/auth/signUp/SignUpConfirmatin.jsx'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>
  },
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/impact',
    element: <Impact/>
  },
  {
    path: '/programs',
    element: <Programs/>
  },
  {
    path: '/team',
    element: <Team/>
  },
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/donate',
    element: <Donation/>
  },
  {
    path: '/d-about/:slug',
    element: <DetailedAbout/>
  },
  {
    path: '/forgot-p',
    element: <Forgot/>
  },
  {
    path: '/generate-otp',
    element: <Otp/>
  },
  {
    path: '/reset-pass',
    element: <ChangePass/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/gr-',
    element: <Thankyou/>
  },
  {
    path: '/volunteer',
    element: <Volunteer/>
  },
  {
    path: '/donor',
    element: <Donor/>
  },
  
  {
    path: '/ch-new-otp',
    element: <SignUpOtpVerification/>
  },
  

])

const App = () => {
  return (
    <>
    <Toaster
    toastOptions={{
          
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
         
          success: {
            style: {
              background: '#22C55E',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#22C55E',
            },
            duration: 4000,
          },
          
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
            duration: 5000,
          },
        }}
    />
   <RouterProvider router={routes}>
      <div className="app"></div>
   </RouterProvider>
   </>
  )
}

export default App