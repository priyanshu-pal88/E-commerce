import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.users)

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-1 text-lg font-medium transition-colors duration-300 
    hover:text-blue-500 after:content-[''] after:absolute after:w-0 after:h-[2px] 
    after:left-0 after:bottom-0 after:bg-blue-500 after:transition-all after:duration-300 
    hover:after:w-full ${isActive ? 'text-blue-500 after:w-full' : 'text-gray-700'}`

  return (
    <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-lg p-4 mb-6  shadow-md rounded-xl">
      <NavLink to="/" className={linkClasses}>Home</NavLink>

      {user && user.id ? (
        <>
          {user?.isAdmin && (
            <NavLink to="/admin/create-product" className={linkClasses}>
              Create Product
            </NavLink>
          )}
          <NavLink to="/cart" className={linkClasses}>
            Cart <i className="ri-shopping-cart-2-fill ml-1"></i>
          </NavLink>
          <NavLink to="/admin/user-profile" className={linkClasses}>
            <i className="ri-user-settings-fill"></i>
          </NavLink>
        </>
      ) : (
        <NavLink to="/login" className={linkClasses}>
          Login
        </NavLink>
      )}
    </nav>
  )
}

export default Navbar
