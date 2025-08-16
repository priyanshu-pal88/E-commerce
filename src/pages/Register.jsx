import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { asyncRegisterUsers } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    dispatch(asyncRegisterUsers(user));
    reset();
    user.email && user.password && navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-white px-4">
      
      <h1 className="text-4xl font-bold mb-10">Create Your Account</h1>

      
      <form
        onSubmit={handleSubmit(RegisterHandler)}
        className="flex flex-col w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
      >
        
        <input
          {...register("name", { required: "Full Name is required" })}
          type="text"
          placeholder="Full Name"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mb-4">{errors.name.message}</p>
        )}

        
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
          })}
          type="email"
          placeholder="Email Address"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-4">{errors.email.message}</p>
        )}

       
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          type="password"
          placeholder="Password"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mb-6">{errors.password.message}</p>
        )}

        
        <button
          type="submit"
          className="w-full py-3 font-bold text-lg rounded-lg bg-gradient-to-br from-purple-700 via-cyan-600 to-purple-600 hover:from-purple-600 hover:via-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
        >
          Register
        </button>

        
        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
