import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row place-content-evenly text-2xl bg-sky-950		 '>
       
      <NavLink to="/">
        Home
      </NavLink>

      <NavLink to="/pastes">
        Paste 
      </NavLink>


    </div>
  )
}

export default Navbar
