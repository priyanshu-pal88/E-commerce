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
        <div className='w-[20%] min-w-[280px] mr-3 mb-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]' key={product.id}>
            <div className="relative overflow-hidden">
                <img 
                    className='w-full h-[15vmax] min-h-[200px] object-cover group-hover:scale-110 transition-transform duration-500' 
                    src={product.image} 
                    alt={product.title}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-4 space-y-3">
                <h1 className='font-bold text-gray-800 text-lg leading-tight hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
                    {product.title}
                </h1>
                
                <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                    {product.description.slice(0, 100)}...
                </p>
                
                <div className='pt-2 space-y-3'>
                    <p className='font-bold text-2xl text-green-500'>
                        ${product.price}
                    </p>
                    
                    <button 
                        className='w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg' 
                        onClick={() => AddtoCartHandler(product)}
                    >
                        Add to Cart
                    </button>
                    
                    <Link 
                        className='block w-full text-center text-blue-500 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-all duration-200' 
                        to={users ?`/product/${product.id}`:`/login`}
                    >
                        More Info →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductTemplate