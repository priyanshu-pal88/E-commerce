import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { asyncDeleteProduct, asyncUpdateProduct } from '../../store/actions/productActions'

const ProductDetails = () => {
  const { id } = useParams()
  const { productReducer: { products }, userReducer: { users } } = useSelector((state) => state)
  const product = products?.find((product) => product.id === id)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description
    }
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UpdateProductHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product))

  }
  const DeleteHandler = (id) => {
    dispatch(asyncDeleteProduct(id))
  }

  return product ? (
    <>
      <div className='w-full flex'>
        <img className=' h-60  object-cover' src={product.image} alt="" />
        <div className=' px-3 w-1/2 h-1/2 '>
          <h1 className='font-bold text-4xl mb-2'>{product.title}</h1>
          <h2 className='text-2xl text-green-400 mb-2'>${product.price}</h2>
          <p className='font-semibold mb-2'>{product.description}</p>
          <button className='border rounded p-2 bg-gray-800'>Add to cart</button>
        </div>
      </div>
      {users && users?.isAdmin &&  <form className='flex flex-col w-full justify-start items-start mt-4' onSubmit={handleSubmit(UpdateProductHandler)} >
        <input {...register("image")} className='outline-0 border-b p-2 mb-6 text-2xl' type="url" placeholder='Link of image' />
        <input {...register("title")} className='outline-0 border-b p-2 mb-4 text-2xl' type="text" placeholder='Title' />
        <input {...register("price")} className='outline-0 border-b p-2 mb-4 text-2xl' type="number" placeholder='Enter the price' />
        <textarea {...register("description")} className='outline-0 border-b p-2 mb-4 text-2xl' placeholder='Description'></textarea>
        <input {...register("category")} className='outline-0 border-b p-2 mb-4 text-2xl' type="text" placeholder='category' />

        <button className='border font-bold  py-2 px-4  mb-4  rounded bg-gray-900 outline-0 cursor-pointer'>Update Product</button>
        <button type='button' onClick={DeleteHandler} className='mb-2 border rounded font-bold py-2 px-4 bg-red-500 cursor-pointer'>Delete Product</button>
      </form>}
     
    </>
  ) : "Loading..."
}

export default ProductDetails