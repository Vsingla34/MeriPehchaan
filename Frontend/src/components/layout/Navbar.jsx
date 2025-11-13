import React, { useState, useEffect } from "react";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [logOut, setLogout] = useState(false);
  const location = useLocation();
  
  // Get user data safely
  const userString = localStorage.getItem("u-");
  const user = userString ? JSON.parse(userString) : null;

  const handleDonationNavigation = () => {
    if (!user || !user.user._id) {
      navigate("/login");
      return;
    }
    navigate('/donate');
  }

  const handleVolunteerNavigation = () => {
    if (!user || !user.user._id) {
      navigate("/login");
      return;
    }
    navigate('/volunteer');
  }

  const isTeamActive =
    location.pathname === "/team" ||
    location.pathname === "/volunteer" ||
    location.pathname === "/donor";

  const logout = () => {
    localStorage.removeItem("u-");
    setLogout(!logOut);
    navigate("/");
  };

  const handleToggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setIsScrolled(true);
    } else {
      setIsMenuOpen(false);
      if (window.scrollY <= 20) {
        setIsScrolled(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else if (!isMenuOpen) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, logOut]);

  const navItems = [
    { key: "home", label: "Home", to: "/" },
    { key: "about", label: "About", to: "/about" },
    { key: "programs", label: "Programs", to: "/programs" },
    { key: "impact", label: "Impact", to: "/impact" },
    { key: "blog", label: "Blogs", to: "/blogs" },
    { key: "contact", label: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 box-border px-3 ${
        isScrolled ? "bg-white shadow-lg" : "bg-black"
      }`}
    >
      <div className="container min-w-full sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <NavLink className="flex items-center space-x-2 group" to="/">
              <Heart
                className={`h-8 w-8 transition-colors duration-300 ${
                  isScrolled ? "text-emerald-600" : "text-white"
                } group-hover:text-emerald-500`}
              />
              <span
                className={`mainlogo text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Meri Pehchaan
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="navmenu hidden lg:flex items-center space-x-6 absolute left-[27%]">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition-colors duration-300 hover:text-emerald-500",
                    isActive
                      ? "text-emerald-600"
                      : isScrolled
                      ? "text-gray-700"
                      : "text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Team Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsTeamDropdownOpen(true)}
              onMouseLeave={() => setIsTeamDropdownOpen(false)}
            >
              <span
                className={`teambox text-sm font-medium transition-colors duration-300 hover:text-emerald-500 cursor-pointer ${
                  isTeamActive
                    ? "text-emerald-600"
                    : isScrolled
                    ? "text-gray-700"
                    : "text-white"
                }`}
              >
                Team
              </span>
              {isTeamDropdownOpen && (
                <div className="absolute top-4 mt-2 w-48 bg-white/90 backdrop-blur rounded-md shadow-xl py-1 z-50 animate-fade-in">
                  <NavLink
                    to="/team"
                    onClick={() => setIsTeamDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Core Members
                  </NavLink>
                  <NavLink
                    to="/volunteer"
                    onClick={() => setIsTeamDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Volunteers
                  </NavLink>
                  <NavLink
                    to="/donor"
                    onClick={() => setIsTeamDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Donors
                  </NavLink>
                </div>
              )}
            </div>
          </nav>

          {/* Tablet Navigation */}
          <nav className="mobmenu hidden md:flex lg:hidden items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 hover:text-emerald-500 ${
                    isActive ? "text-emerald-600" : isScrolled ? "text-gray-700" : "text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
             <div
              className="relative"
              onMouseEnter={() => setIsTeamDropdownOpen(true)}
              onMouseLeave={() => setIsTeamDropdownOpen(false)}
            >
              <span
                className={`teambox text-sm font-medium transition-colors duration-300 hover:text-emerald-500 cursor-pointer ${
                  isTeamActive ? "text-emerald-600" : isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                Team
              </span>
              {isTeamDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white/90 backdrop-blur rounded-md shadow-xl py-1 z-50 animate-fade-in">
                  <NavLink to="/team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Core Members</NavLink>
                  <NavLink to="/volunteer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Volunteers</NavLink>
                  <NavLink to="/donor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Donors</NavLink>
                </div>
              )}
            </div>
          </nav>

          {/* User Menu & Donate */}
          <div className="flex-1 hidden md:flex items-center justify-end space-x-4">
            <button onClick={handleVolunteerNavigation} className="navbtn bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors duration-300">
              Become a Volunteer
            </button>
            <button onClick={handleDonationNavigation} className="navbtn bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors duration-300">
              Donate
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                  <User className="h-5 w-5" />
                  <NavLink to="/dashboard">
                    Hi, <span className="text-emerald-500 hover:scale-[1.5] cursor-pointer hover:border-b-2 border-emerald-500">{user.user.fullname.split(' ')[0]}</span>
                  </NavLink>
                </span>
                <button onClick={logout} className={`flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${isScrolled ? "text-gray-700 hover:text-emerald-600 hover:bg-gray-100" : "text-white hover:text-emerald-300 hover:bg-white/10"}`}>
                  <LogOut className="h-5 w-5 mr-1" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink to="/login" className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${isScrolled ? "text-gray-700 hover:text-emerald-600 hover:bg-gray-100" : "text-white hover:text-emerald-300 hover:bg-white/10"}`}>Login</NavLink>
                <NavLink to="/signup" className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors duration-300">Sign Up</NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="hammenu md:hidden">
            <button onClick={handleToggleMenu} className={`p-2 rounded-md transition-colors duration-300 ${isScrolled ? "text-gray-700" : "text-white"}`}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden bg-white shadow-lg rounded-lg mt-2`}>
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.key} to={item.to} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive ? "text-emerald-600 bg-emerald-50" : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"}`}>
                {item.label}
              </NavLink>
            ))}

            <div className="border-t pt-3 mt-3">
              {user ? (
                <div className="space-y-2">
                  <NavLink to="/donate" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-white hover:bg-yellow-600">Donate Now</NavLink>
                  <NavLink to="/volunteer" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-white hover:bg-yellow-600">Volunteer Now</NavLink>
                  <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
                    <LogOut className="h-5 w-5 inline-block mr-2" /> Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <NavLink to="/donate" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-white hover:bg-yellow-600">Donate Now</NavLink>
                  <NavLink to="/volunteer" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-white hover:bg-yellow-600">Volunteer Now</NavLink>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Login</NavLink>
                  <NavLink to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700">Sign Up</NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;