import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUsers } from "../store/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);

  const IncreaseQuantity = (index) => {
    const copyUser = { ...users, cart: [...users.cart] };
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      quantity: copyUser.cart[index].quantity + 1,
    };
    dispatch(asyncUpdateUsers(users.id, copyUser));
  };

  const DecreaseQuantity = (index) => {
    const copyUser = { ...users, cart: [...users.cart] };
    if (copyUser.cart[index].quantity === 1) {
      copyUser.cart.splice(index, 1);
    } else {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity - 1,
      };
    }
    dispatch(asyncUpdateUsers(users.id, copyUser));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen  w-full">
      <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
      <div className="space-y-6 conte">
        {users.cart?.map((ci, i) => (
          <div
            key={i}
            className="flex flex-col  md:flex-row items-center justify-between bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            
            <img
              className="w-32 h-32 object-cover rounded-lg"
              src={ci.product.image}
              alt={ci.product.title}
            />

            
            <div className="flex-1 text-center md:text-left px-4">
              <h2 className="font-semibold text-xl text-white">
                {ci.product.title}
              </h2>
              <p className="text-green-400 font-bold text-lg mt-1">
                ${ci.product.price}
              </p>
            </div>

            
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => DecreaseQuantity(i)}
                className="px-4 py-2 text-white text-lg font-bold hover:bg-gray-600 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 text-white font-medium">
                {ci.quantity}
              </span>
              <button
                onClick={() => IncreaseQuantity(i)}
                className="px-4 py-2 text-white text-lg font-bold hover:bg-gray-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
