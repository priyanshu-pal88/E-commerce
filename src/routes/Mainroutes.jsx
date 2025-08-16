import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import AuthWrapper from './AuthWrapper'
const Products = lazy(() => import('../pages/Products'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const CreateProduct = lazy(() => import('../pages/admin/CreateProduct'))
const ProductDetails = lazy(() => import('../pages/admin/ProductDetails'))
const UserProfile = lazy(() => import('../pages/user/UserProfile'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

const Cart = lazy(() => import('../pages/Cart'))

const Mainroutes = () => {
  return (
     
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/admin/create-product' element={<AuthWrapper><CreateProduct /></AuthWrapper>} />
        <Route path='/product/:id' element={<AuthWrapper><ProductDetails /></AuthWrapper>} />
        <Route path='/admin/user-profile' element={<AuthWrapper><UserProfile /></AuthWrapper>} />
        <Route path='/cart' element={<AuthWrapper><Cart /></AuthWrapper>} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
   
  )
}

export default Mainroutes