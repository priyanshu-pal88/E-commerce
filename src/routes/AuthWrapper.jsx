import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"



const AuthWrapper = (props) => {
    // const  { users } = useSelector((state) => state.userReducer)
    const users = JSON.parse(localStorage.getItem("user"))
  return users  ? props.children : <Navigate to="/login"/>
}

export default AuthWrapper