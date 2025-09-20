import { X } from "lucide-react";
import React from "react";

const Video = ({ toggleVideo, setVideoBox }) => {
  const handleToggle = () => {
    setVideoBox(!toggleVideo);
  };

  return (
    <section className=" fixed left-2/4 top-18 translate-x-[-50%] h-[80%] w-[80%] z-49 bg-white ">
      <div 
      onClick={handleToggle} 
      className=" h-6 w-6 absolute top-5 right-5 bg-white text-black  rounded-full "
      title="Close Video Tab"
      
      >
        <X />
      </div>

      <iframe
        src="https://res.cloudinary.com/dgdyjo0xt/video/upload/v1757937792/AQNJ6qFX-mS6wz8JB9Zodgz6n01UeB1fiXVX07jmj6nyslUvQgIPtf52VT9HqUU1OEMT0AW8mcaaNdvPhRpgeTBj_k4odcm.mp4"
        frameBorder="0"
        allow=" autoplay;"
        title="video"
        allowFullScreen
        className=" h-full w-full"
      ></iframe>
    </section>
  );
};

export default Video;
