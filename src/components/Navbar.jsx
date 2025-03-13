import React from 'react'
import Button from './Button'

const Navbar = () => {
  return (
    <nav className='w-full  p-5  flex lg:fixed z-100 justify-between items-center'>
        <div className="logo  w-20 lg:w-40 ">
            <img className='w-full h-full object-cover' src="https://decathlon-wlkr76.index.studio/static/LandingPage/Sportswear/images/logo-wlkr.67cfee4de79c5e641ff05de74bb64f2a.png" alt="" />
        </div>
        <a href="#" className='px-10 py-2 bg-[#897460] rounded-full text-white font-black absolute 
        bottom-0 left-1/2 transform -translate-x-1/2 block lg:hidden '>ACHETER</a>
        <a href="#" className='px-10 py-2 bg-[#897460] rounded-full  text-white font-black hidden lg:block '>ACHETER</a>
    </nav>
  )
}

export default Navbar