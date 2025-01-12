import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarData } from './data/navlink'
const Navbar = () => {
  return (
    <div className='w-full h-[45px] flex justify-center items-center p-5 bg-gray-800 gap-x-5% gap-10 w-screen'>

{NavbarData.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-xl"
              : "text-white font-medium text-xl"
          }
        >
          {link.title}
        </NavLink>
      ))}


      {/* <NavLink to="/" >
        Home
      </NavLink>

      <NavLink to="/pastes">
        Paste 
      </NavLink> */}


    </div>
  )
}

export default Navbar
