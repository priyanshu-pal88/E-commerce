import axios from '../../api/axiosconfig'
import { loaduser, removeuser } from '../reducers/userSlice'

export const asyncRegisterUsers = (user) => async (dispatch, getState) => {
    try {
        const res = await axios.post("/users", user)

    } catch (error) {
        console.log(error)
    }
}

export const asyncLoginUsers = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/users?email=${user.email}&password=${user.password}`)
        localStorage.setItem("user", JSON.stringify(data[0]))
        dispatch(asyncCurrentUsers())
    } catch (error) {
        console.log(error)
    }
}



export const asyncCurrentUsers = (user) => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) { dispatch(loaduser(user)) }
        else { console.log("User not Logged in") }
    } catch (error) {
        console.log(error)
    }
}

export const asyncLogoutUsers = (user) => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user")
        dispatch(removeuser())

    } catch (error) {
        console.log(error)
    }
}

export const asyncUpdateUsers = (id, user) => async (dispatch, getState) => {
    try {

        const { data } = await axios.patch(`/users/${id}`, user)
        localStorage.setItem("user", JSON.stringify(data))
        // dispatch(asyncCurrentUsers())
        dispatch(loaduser(data))


    } catch (error) {
        console.log(error)
    }
}

export const asyncDeleteUsers = (id) => async (dispatch, getState) => {

    try {
        await axios.delete("/users/" + id)
        dispatch(asyncLogoutUsers())
    } catch (error) {
        console.log(error)
    }
}