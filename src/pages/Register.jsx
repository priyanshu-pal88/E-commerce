import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { asyncRegisterUsers } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'

const Register = () => {
    const {register, handleSubmit,reset} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const RegisterHandler=(user)=>{
        user.id = nanoid()
        user.isAdmin = false
        user.cart = []
        dispatch(asyncRegisterUsers(user))
        reset()
        navigate("/login")
    }
  return (
    <form className='flex flex-col w-1/2 justify-start items-start' onSubmit={handleSubmit(RegisterHandler)} >
        <input {...register("name")} className='outline-0 border-b p-2 mb-4 text-2xl' type="text"  placeholder='UserName'/>
        <input {...register("email")} className='outline-0 border-b p-2 mb-4 text-2xl' type="email"  placeholder='Enter Your email'/>
        <input {...register("password")} className='outline-0 border-b p-2 mb-6 text-2xl' type="password"  placeholder='Enter the Password'/>
        <button className='border font-bold  py-2 px-4  mb-4  rounded bg-gray-900'>Register</button>
        <p className='my-5' >Already Have an Account? <Link to='/login' className='text-blue-400'>Login</Link></p>
    </form>
  )
}

export default Register