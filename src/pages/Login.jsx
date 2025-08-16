import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { asyncLoginUsers } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitHandler = (user) => {
    dispatch(asyncLoginUsers(user));
    navigate("/");
    reset();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-br from-cyan-900 via-gray-800 to-black text-white px-4">
      
      <h1 className="text-4xl font-bold mb-10">Login to Your Account</h1>

      
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="flex flex-col w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
      >
       
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email"
            }
          })}
          type="email"
          placeholder="Enter Your Email"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-4">{errors.email.message}</p>
        )}

        
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
          type="password"
          placeholder="Enter Your Password"
          className="w-full bg-transparent border-b border-gray-500 focus:border-cyan-400 outline-none p-3 mb-2 text-lg transition-all"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mb-4">{errors.password.message}</p>
        )}

        
        <button
          type="submit"
          className="w-full py-3 font-bold text-lg rounded-lg bg-gradient-to-br from-purple-700 via-cyan-600 to-purple-600 hover:from-purple-600 hover:via-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
        >
          Login
        </button>

        
        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
