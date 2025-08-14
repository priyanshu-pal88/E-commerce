import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { asyncCreateProduct, asyncLoadProduct } from '../../store/actions/productActions'
import { nanoid } from 'nanoid'

const CreateProduct = () => {
  const {register, handleSubmit,reset} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createProductHandler=(product)=>{
        product.id = nanoid()
        dispatch(asyncCreateProduct(product))
        reset()
        navigate('/products')
    }
  return (
    <form className='flex flex-col w-1/2 justify-start items-start' onSubmit={handleSubmit(createProductHandler)} >
        <input {...register("image")} className='outline-0 border-b p-2 mb-6 text-2xl' type="url"  placeholder='Link of image'/>
        <input {...register("title")} className='outline-0 border-b p-2 mb-4 text-2xl' type="text"  placeholder='Title'/>
        <input {...register("price")} className='outline-0 border-b p-2 mb-4 text-2xl' type="number"  placeholder='Enter the price'/>
        <textarea {...register("description")} className='outline-0 border-b p-2 mb-4 text-2xl' placeholder='Description'></textarea>
        <input {...register("category")} className='outline-0 border-b p-2 mb-4 text-2xl' type="text"  placeholder='category'/>

        <button className='border font-bold  py-2 px-4  mb-4  rounded bg-gray-900 outline-0'>Create Product</button>
    </form>
  )
}

export default CreateProduct