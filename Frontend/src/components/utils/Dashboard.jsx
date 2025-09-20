import React, { useState, useRef, useEffect } from "react";
import Header from "../layout/Navbar";
import { getProfilePic, uploadProfilePic } from "../../services/user.services";

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("u-"));
  const numDate = userData?.user?.createdAt;
  const dateObj = new Date(numDate);
  const [user,setUser] = useState({
    fullname:userData.user.fullname,
    email:userData.user.email,
    role:userData.user.role,
    program:userData.user.program,
    _id:userData.user._id
  })
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatedDate = dateObj.toLocaleDateString("en-US", options);
  const [profilePicture, setProfilePicture] = useState('');
 

 
 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  
  useEffect(() => {
    window.scrollTo({
      top:0
    })

    

    const fetchProfilePic = async () => {
      
      try {
        const response = await getProfilePic({id:userData.user._id})
        setProfilePicture(`${response.data.picUrl}`)
        

      } catch (error) {
        console.log('Error while fetching pic :', error.response.data.message);
      }
    };
    fetchProfilePic();
  }, []);
  

  const handleFileChange =  async (e) => {
  
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
     
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('profilePic', file);
    formData.append('id', userData?.user?._id);

    try {
      const response = await uploadProfilePic(formData)
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  const handleAddButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleViewButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Header />

      <main className="container mx-auto p-4 md:p-8 mt-10 md:mt-18   ">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 pt-12 ">
          Profile <span className="text-emerald-500">Overview</span>
        </h1>

       
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
         
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg group">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-gray-600">
                {user.fullname.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer space-y-2">
              {profilePicture==='https://i.ibb.co/3ywTZFTd/download.png'?" ": (
                <button
                  onClick={handleViewButtonClick}
                  className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={handleAddButtonClick}
                className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.86-1.638A2 2 0 0110.45 3h3.1a2 2 0 011.664.89l.86 1.638A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          {/* User Details */}
          <div className="space-y-2 text-gray-700">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 ">
              {" "}
              Hello,{" "}
              <span className="text-emerald-500">
                {" "}
                {user.fullname.slice(0, 1).toUpperCase()}
                {user.fullname.slice(1)}
              </span>
            </h2>
            <p>
              <strong>Email:</strong>{" "}
              <span className="text-emerald-600 font-bold">
                {" "}
                {user.email}{" "}
              </span>
            </p>
            <p>
              <strong>Member Since:</strong>{" "}
              <span className="text-emerald-600 font-bold">
                {" "}
                {formatedDate}{" "}
              </span>
            </p>
            <p>
              <strong>User ID:</strong>
              <span className="text-emerald-600 font-bold">
                {" "}
                {user._id}
              </span>
            </p>
            <p>
              <strong>Role :</strong>{" "}
              <span className="text-emerald-600 font-bold">
                {user?.role}
              </span>{" "}
            </p>
            <p>
              <strong>Program :</strong>{" "}
              <span className="text-emerald-600 font-bold">
                {user?.program}
              </span>{" "}
            </p>
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">History</h2>
          <ul className="space-y-4 text-gray-700">
          
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Donation History
            </h3>
            <li className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <p className="font-medium">
                  ₹ 5,000 to "Clean Water Initiative"
                </p>
                <p className="text-sm text-gray-500">
                  Donation ID: #D-20250911
                </p>
              </div>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                Sep 10, 2025
              </span>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <p className="font-medium">
                  ₹ 1,000 to "Children's Education Fund"
                </p>
                <p className="text-sm text-gray-500">
                  Donation ID: #D-20250820
                </p>
              </div>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                Aug 20, 2025
              </span>
            </li>

            
            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-2">
              Recent Activity
            </h3>
            <li className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <p className="font-medium">Logged in from a new device</p>
                <p className="text-sm text-gray-500">
                  Device: Windows 10, Chrome Browser
                </p>
              </div>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                2 hours ago
              </span>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <p className="font-medium">Account details updated</p>
                <p className="text-sm text-gray-500">
                  Details changed: Email address
                </p>
              </div>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                Yesterday
              </span>
            </li>
          </ul>
        </div>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative max-w-sm md:max-w-xl w-full">
            <button
              onClick={handleCloseModal}
              className="absolute -top-7 right-0 md:-top- text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={profilePicture}
              alt="Profile"
              className="max-w-full max-h-[500px] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
