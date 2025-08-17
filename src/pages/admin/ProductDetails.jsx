import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  asyncDeleteProduct,
  asyncUpdateProduct,
} from "../../store/actions/productActions";
import { asyncUpdateUsers } from "../../store/actions/userActions";
import { loaduser } from "../../store/reducers/userSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.userReducer.users)
  const products = useSelector((state) => state.productReducer.products)

  const product = products?.find((p) => p.id === id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UpdateProductHandler = (updatedProduct) => {
    dispatch(asyncUpdateProduct(id, updatedProduct));
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteProduct(id));
    navigate("/");
  };
  const AddtoCartHandler = (product) => {
    const copyuser = { ...users, cart: Array.isArray(users.cart) ? [...users.cart] : [] }
    const x = copyuser.cart.findIndex((c) => c?.product.id == product.id)
    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 })
    }
    else {
      copyuser.cart[x] = {
        ...copyuser.cart[x],
        quantity: copyuser.cart[x].quantity + 1
      }
    }
    // dispatch(asyncUpdateUsers(copyuser.id, copyuser))
    dispatch(loaduser(copyuser))
    localStorage.setItem("user", JSON.stringify(copyuser))
    toast.success("Item added to cart")
  }

  return product ? (
    <div className="w-full px-[10%] py-8 min-h-screen bg-gray-900 text-white">

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="flex-1 flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img
            className="object-cover w-full h-96 lg:h-[500px]"
            src={product.image}
            alt={product.title}
          />
        </div>


        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-4xl mb-4">{product.title}</h1>
            <h2 className="text-2xl text-green-400 mb-4">${product.price}</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Category: {product.category}
            </p>
          </div>

          <button onClick={() => AddtoCartHandler(product)} className="w-full lg:w-auto bg-cyan-500 hover:bg-cyan-600 transition-colors px-6 py-3 rounded-lg font-bold">
            Add to Cart
          </button>
        </div>
      </div>


      {users && users?.isAdmin && (
        <div className="mt-12">
          <div className="p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-red-600 to-purple-700 shadow-lg">
            <div className="bg-gray-950 rounded-2xl p-8">
              <h2 className="text-gray-400 text-xl mb-6">Edit Product</h2>

              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(UpdateProductHandler)}
              >
                <input
                  {...register("image")}
                  className="bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                  type="url"
                  placeholder="Image URL"
                />
                <input
                  {...register("title")}
                  className="bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                  type="text"
                  placeholder="Title"
                />
                <input
                  {...register("price")}
                  className="bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                  type="number"
                  placeholder="Price"
                />
                <textarea
                  {...register("description")}
                  className="bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                  placeholder="Description"
                ></textarea>
                <input
                  {...register("category")}
                  className="bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                  type="text"
                  placeholder="Category"
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 transition-colors py-2 rounded-lg font-bold">
                    Update Product
                  </button>
                  <button
                    type="button"
                    onClick={DeleteHandler}
                    className="flex-1 bg-red-700 hover:bg-red-800 transition-colors py-2 rounded-lg font-bold"
                  >
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    "Loading..."
  );
};

export default ProductDetails;
