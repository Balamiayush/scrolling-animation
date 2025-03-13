import React from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Rows = () => {
  useGSAP(() => {
    // gsap.to(".row  ", {
    //   x: -100,
    //   fontWeight: 100,
    //   scrollTrigger:{
    //     trigger:".page3",
    //     start:"top top",
    //     end:"bottom bottom",
    //     scrub:1,
    //     pin:true
    //   }
    // })
  })
  return (
    <div className='flex  w-[400vh] row   gap-2   mt-5 '>
      <div className="box1 bg-red-500 w-60 h-45 flex">
      </div>
        <h1 className="text-3xl capitalize">Box 1</h1>
      <div className="box2 bg-red-500 w-60 h-45"></div>
      <div className="box3 bg-red-500 w-60 h-45"></div>
      <div className="box4 bg-red-500 w-60 h-45"></div>
      <div className="box4 bg-red-500 w-60 h-45"></div>
    </div>
  )
}

export default Rows