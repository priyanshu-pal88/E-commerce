

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

        if (copyUser.cart[index].quantity == 1) {
            copyUser.cart.splice(index, 1);
        } else {
            copyUser.cart[index] = {
                ...copyUser.cart[index],
                quantity: copyUser.cart[index].quantity - 1,
            };
        }
        dispatch(asyncUpdateUsers(users.id, copyUser));
    };

    // let x = user.cart.reduce((ac, cv) => {
    //     return ac + Number(cv.product.price) * cv.quantity;
    // }, 0);
    // console.log(x);

    return (
        <div className="p-5">
            {users.cart?.map((ci, i) => {
                return (
                    <div
                        className="flex items-center justify-between mb-10 bg-gray-800 p-2 rounded"
                        key={i}
                    >
                        <img
                            className="h-[15vmax]"
                            src={ci.product.image}
                            alt=""
                        />
                        <h1 className="font-bold text-2xl">{ci.product.title}</h1>
                        <h2 className="text-green-500 font-semibold text-2xl">${ci.product.price}</h2>
                        <div className="text-2xl border rounded px-4 py-2">
                            <button
                                onClick={() => IncreaseQuantity(i)}
                                className="text-2xl"
                            >
                                +
                            </button>
                            <span className="mx-3">{ci.quantity}</span>
                            <button
                                onClick={() => DecreaseQuantity(i)}
                                className="text-2xl"
                            >
                                -
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


export default Cart;