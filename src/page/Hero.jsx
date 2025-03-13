import React from "react";
import Navbar from "../components/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    gsap.to(".clodes", {
      opacity: 1,
      duration:1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".clodes",
        start: "top top", // Starts when element enters viewport
        end: "bottom bottom", // Fully visible at center
        scrub:2,
        // pin: true,
        // markers: true, // Remove in production
      },
    });
  }, []);

  return (
    <div className="w-full h-screen relative hero">
      <div className="w-full h-full absolute z-[-1]">
        {/* Clouds */}
        <img
          src="https://decathlon-wlkr76.index.studio/static/LandingPage/Sportswear/images/launcher/clouds.39a06bd83909277989128fe297cbff12.webp"
          className="w-full clodes h-[200vh] object-cover z-[1] absolute opacity-0
          top-0 left-0
          "
          alt="Clouds"
        />
        
        {/* Desktop Image */}
        <img
          className="hidden md:block w-full h-full object-cover"
          src="https://decathlon-wlkr76.index.studio/static/LandingPage/Sportswear/images/introduction/splash.d1eea525d54f91c4e8c84eceda36e563.jpg"
          alt="Desktop Background"
        />

        {/* Mobile Image */}
        <img
          className="block md:hidden w-full h-full object-cover"
          src="https://decathlon-wlkr76.index.studio/static/LandingPage/Sportswear/images/introduction/splash-mobile.bfae2f45390cbce8387defe06800e7ee.jpg"
          alt="Mobile Background"
        />
           <img
          src="https://decathlon-wlkr76.index.studio/static/LandingPage/Sportswear/images/launcher/clouds.39a06bd83909277989128fe297cbff12.webp"
          className="w-full clodes h-[200vh] object-cover z-[1] absolute opacity-0
          bottom-0 left-0
          "
          alt="Clouds"
        />
      </div>
      <Navbar />
    </div>
  );
};

export default Hero;
