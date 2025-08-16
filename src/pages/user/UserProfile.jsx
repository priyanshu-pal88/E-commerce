import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  asyncDeleteUsers,
  asyncLogoutUsers,
  asyncUpdateUsers,
} from "../../store/actions/userActions";

const UserProfile = () => {
  const { users } = useSelector((state) => state.userReducer);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: users?.name,
      email: users?.email,
      password: users?.password,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UpdateUserHandler = (user) => {
    dispatch(asyncUpdateUsers(users.id, user));
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteUsers(users.id));
    navigate("/login");
  };

  const LogoutUserHandler = () => {
    dispatch(asyncLogoutUsers(users));
    navigate("/login");
  };

  return users ? (
    <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-6 overflow-auto">
      <div className="max-w-screen-lg mx-auto">
        
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">User Profile</h1>
          <p className="text-gray-400">
            Manage your details, view your status, and change your password.
          </p>
        </div>

        
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-2xl shadow-lg w-full lg:w-1/3">
            <div className="h-28 w-28 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-center">{users.name}</h2>
            <p className="text-gray-400 mt-1 text-center">{users.email}</p>
            <button
              type="button"
              onClick={LogoutUserHandler}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 transition-colors py-2 rounded-lg font-bold"
            >
              Logout
            </button>
          </div>


          <div className="flex-1">
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-cyan-700 via-purple-700 to-gray-700 shadow-lg">
              <div className="bg-gray-950 rounded-2xl p-6 sm:p-8">
                <h1 className="text-gray-400 text-xl mb-6">
                  General Information
                </h1>

                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(UpdateUserHandler)}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      {...register("name")}
                      className="flex-1 bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                      type="text"
                      placeholder="User Name"
                    />
                    <input
                      {...register("email")}
                      className="flex-1 bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                      type="email"
                      placeholder="Email"
                    />
                    <input
                      {...register("password")}
                      className="flex-1 bg-transparent border-b border-gray-600 focus:border-cyan-400 outline-none p-2 text-lg"
                      type="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 transition-colors py-2 rounded-lg font-bold">
                      Update Info
                    </button>

                    {users?.isAdmin && (
                      <button
                        type="button"
                        onClick={DeleteHandler}
                        className="flex-1 bg-red-700 hover:bg-red-800 transition-colors py-2 rounded-lg font-bold"
                      >
                        Remove User
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default UserProfile;
