import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Page1 from "./page/Page1";
import Hero from "./page/Hero";
import Page3 from "./page/Page3";


const App = () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenisRef = useRef();
  
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);
  
  // useGSAP(() => {
  //   window.addEventListener("mousemove", (e) => {
  //     gsap.to(".cirlce", {
  //       x: e.clientX,
  //       y: e.clientY,
  //     });
  //   });
  // });
  
  return (
 
     <div className="w-full relative ">
      <Hero/>
      <Page1/>
      <Page3/>
      </div>

  );
};

export default App;
