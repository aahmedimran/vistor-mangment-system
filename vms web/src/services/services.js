import axios from 'axios'
import { toast } from 'react-toastify';

const signup = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/SignUp`, data, { withCredentials: true })
    console.log(response, "response") 
    return response
  }
  catch (e) {
    console.log("error in api call", e)
  }
}

const Loginhandler = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Login`, data, { withCredentials: true })
    console.log(response, "response")

    return response
  }
  catch (error) {
    console.log(error, "error")
    // console.log(error.message, "e.message🚗🚗🚗")
    // console.log(e.response.data.message, "e.message🚗🚗🚗")
    toast.error("Email Or Password Incorrect")
    return error
  }
}

const LogoutHandler = async (data) => {
  try {
    let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/logout`, data, { withCredentials: true })
    console.log(response, "response")
    return response
  }
  catch (e) { console.log("error in api call", e) }
}

const HandleAddDeportment = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/AddDeportment`, data, { withCredentials: true }, { 'Content-Type': 'application/json' })
    console.log(response.data, "response")
    return response
  }
  catch (e) { console.log("error in api call", e) }
}

export { signup, Loginhandler, LogoutHandler, HandleAddDeportment }