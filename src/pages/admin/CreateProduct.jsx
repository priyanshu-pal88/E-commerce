import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  asyncCreateProduct,
} from "../../store/actions/productActions";
import { nanoid } from "nanoid";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProductHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product));
    reset();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-900 via-gray-800 to-black text-white px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10">Create a New Product</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(createProductHandler)}
        className="flex flex-col w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
      >
        {/* Image URL */}
        <input
          {...register("image", {
            required: "Image URL is required",
            pattern: {
              value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
              message: "Please enter a valid image URL",
            },
          })}
          type="url"
          placeholder="Link of image"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.image && (
          <p className="text-red-400 text-sm mb-4">{errors.image.message}</p>
        )}

        {/* Title */}
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.title && (
          <p className="text-red-400 text-sm mb-4">{errors.title.message}</p>
        )}

        {/* Price */}
        <input
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
          type="number"
          placeholder="Enter the price"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.price && (
          <p className="text-red-400 text-sm mb-4">{errors.price.message}</p>
        )}

        {/* Description */}
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          placeholder="Description"
          rows="4"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all resize-none"
        ></textarea>
        {errors.description && (
          <p className="text-red-400 text-sm mb-4">{errors.description.message}</p>
        )}

        {/* Category */}
        <input
          {...register("category", { required: "Category is required" })}
          type="text"
          placeholder="Category"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.category && (
          <p className="text-red-400 text-sm mb-4">{errors.category.message}</p>
        )}

        {/* Create Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 font-bold text-lg rounded-lg bg-gradient-to-br from-purple-700 via-cyan-600 to-purple-600 hover:from-purple-600 hover:via-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
