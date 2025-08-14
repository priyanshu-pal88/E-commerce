import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { asyncLoginUsers } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'


const Login = () => {
    const {register, handleSubmit,reset} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
      const SubmitHandler=(user)=>{
        dispatch(asyncLoginUsers(user))
        navigate("/")

        reset()
    }
    
  return (
    <form className='flex flex-col w-1/2 justify-start items-start' onSubmit={handleSubmit(SubmitHandler)} >
        <input {...register("email")} className='outline-0 border-b p-2 mb-4 text-2xl' type="email"  placeholder='Enter Your email'/>
        <input {...register("password")} className='outline-0 border-b p-2 mb-6 text-2xl' type="password"  placeholder='Enter the Password'/>
        <button className='border font-bold  py-2 px-4  mb-4  rounded bg-gray-900'>Login</button>
        <p className='my-5' >Don't Have an Account? <Link to='/register' className='text-blue-400'>Register</Link></p>
    </form>
  )
}

export default Login