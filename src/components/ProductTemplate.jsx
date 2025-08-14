import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { asyncUpdateUsers } from '../store/actions/userActions'

const ProductTemplate = ({product}) => {
      const users = useSelector((state) => state.userReducer.users)
    const dispatch = useDispatch()
    const AddtoCartHandler = (product) => {
        const copyuser = { ...users, cart: Array.isArray(users.cart) ? [...users.cart] : [] }
        const x = copyuser.cart.findIndex((c) => c?.product.id == product.id)
        if (x == -1) {
            copyuser.cart.push({ product, quantity: 1 })
        }
        else {
            copyuser.cart[x] = {
                product,
                quantity: copyuser.cart[x].quantity + 1
            }
        }
        dispatch(asyncUpdateUsers(copyuser.id, copyuser))
    }
    return (
        <div className='w-[20%]   mr-3 mb-3 border rounded ' key={product.id}>
            <img className='w-full h-[15vmax]  ' src={product.image} alt="" />
            <h1 className='font-bold'>{product.title}</h1>
            <p className='font-thin'>{product.description.slice(0, 100)}...</p>
            <div className=' px-4 mt-2     gap-3'>
                <p className='font-bold text-green-400'>${product.price}</p>
                <button className='border bg-gray-800 w-full my-3' onClick={() => AddtoCartHandler(product)} >Add to cart</button>
            </div>
            <Link className='text-blue-400 block  w-full text-center' to={`/product/${product.id}`}>More Info</Link>
        </div>
    )
}

export default ProductTemplate