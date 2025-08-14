import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router'

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.users)


  return (
    <nav className='flex justify-center items-center gap-x-12 text-2xl p-4 mb-6'>
      <NavLink to="/" >Home</NavLink>
      {/* <NavLink to="/products" >Products</NavLink> */}
      {user && user.id ? <>
        {user && user?.isAdmin && <NavLink to="/admin/create-product" >Create Product</NavLink>}
        <NavLink to="/cart">Cart<i className="ri-shopping-cart-2-fill"></i></NavLink>

        <NavLink to="/admin/user-profile"><i className="ri-user-settings-fill"></i></NavLink>
      </> : <>
        <NavLink to="/login" >Login</NavLink>
      </>}


    </nav>
  )
}

export default Navbar