import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import Header from "../layout/Navbar.jsx";
import SiteFooter from "../layout/Footer.jsx";
import Hero from "./Hero.jsx";
import Impact from "./Impact.jsx";
import About from "./About.jsx";
import Programs from "./Programs.jsx";
import FacebookPageFeed from "../utils/LiveFbPage.jsx";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const mockAuth = { user: null, logout: () => console.log("Logged out") };
  return (
    <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>
  );
};

export const useAnimatedCounter = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top:0
    })
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(endValue, 10);
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

          if (elementRef.current) {
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

function MainPage() {
  useEffect(() => {
    try {
      if (!localStorage.getItem("ngo_users")) {
        localStorage.setItem(
          "ngo_users",
          JSON.stringify([{ id: "1", name: "Demo User" }])
        );
      }
    } catch (e) {
      console.error("Local storage is unavailable or failed to initialize.");
    }
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white  ">
        <Header />
        <main>
          <Hero />
          <About />
          <Programs />
          <Impact />
         
        </main>
        <SiteFooter />
      </div>
    </AuthProvider>
  );
}

export default MainPage;
