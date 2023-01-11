import axios from 'axios'
import { toast } from 'react-toastify';

const signup = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, data, { withCredentials: true })
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
  catch (e) {
    console.log(e, "error")
    toast.error("Email Or Password Incorrect")
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
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/AddDeportment`, data, { withCredentials: true })
    console.log(response.data, "response")
    return response
  }
  catch (e) { console.log("error in api call", e) }
}

export { signup, Loginhandler, LogoutHandler, HandleAddDeportment }