import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { asyncDeleteUsers, asyncLogoutUsers, asyncUpdateUsers } from '../../store/actions/userActions'

const UserProfile = () => {

    const { users }  = useSelector((state) => state.userReducer)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: users?.name,
            email: users?.email,
            password: users?.password,

        }
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const UpdateUserHandler = (user) => {
        dispatch(asyncUpdateUsers(users.id, user))

    }
    const DeleteHandler = () => {
        dispatch(asyncDeleteUsers(users.id))
        navigate("/login")
    }
    const LogoutUserHandler = () => {
        dispatch(asyncLogoutUsers(users))
        navigate("/login")
    }
    return users ? (
        <div>

            <form className='flex flex-col w-full justify-start items-start mt-4' onSubmit={handleSubmit(UpdateUserHandler)} >
                <input {...register("name")} className='outline-0 border-b p-2 mb-4 text-2xl' type="text" placeholder=' UserName' />
                <input {...register("email")} className='outline-0 border-b p-2 mb-4 text-2xl' type="email" placeholder='Email' />
                <input {...register("password")} className='outline-0 border-b p-2 mb-6 text-2xl' type="password" placeholder='Password' />

                <button className='border font-bold  py-2 px-4  mb-4  rounded bg-gray-900 outline-0 cursor-pointer'>Update User</button>
                <button type='button' onClick={LogoutUserHandler} className='mb-2 border rounded font-bold py-2 px-4 bg-red-400 cursor-pointer'>Logout User</button>
                {users?.isAdmin && <button type='button' onClick={DeleteHandler} className='mb-2 border rounded font-bold py-2 px-4 bg-red-800 cursor-pointer'>Remove User</button>
                }
            </form>
        </div>
    ) : "Loading..."
}

export default UserProfile