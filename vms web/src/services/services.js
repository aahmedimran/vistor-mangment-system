import axios from 'axios'
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_BASE_URL

const signup = async (data)=>{
    try {
        const response = await axios.post(`${apiUrl}/signup`, data, {withCredentials: true})
        console.log(response, "response")
      }
      catch  (e) {
        console.log("error in api call", e)
      }
}

const Loginhandler = async (data) =>{
  try{
    const response = await axios.post(`${apiUrl}/login`,data,{withCredentials: true})
    console.log(response, "response")
    return response
    }
    catch(e){console.log(e,"error")
    toast.error("Email Or Password Incorrect")
  }
}

const LogoutHandler = async (data) => {
  try {
    let response = await axios.post(`${apiUrl}/logout`,data, { withCredentials: true } )
    console.log(response, "response")
    return response
  }
  catch (e) { console.log("error in api call", e)}
}

const HandleAddDeportment = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/deportment`, data, {withCredentials: true})
    console.log(response, "response")
    return response
  }
  catch  (e) {
    console.log("error in api call", e)
  }
}

export { signup ,Loginhandler, LogoutHandler, HandleAddDeportment}