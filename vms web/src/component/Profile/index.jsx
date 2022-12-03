import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../Context/context'
import axios from 'axios'
import './index.css'
const Profile = () => {
  const { state } = useContext(GlobalContext)
const [firstName, setfirstName] = useState(state?.user?.firstName)
const [lastName, setlastName] = useState(state?.user?.lastName)
const [email, setemail] = useState(state?.user?.email)
  const apiUrl = process.env.REACT_APP_BASE_URL;
  
  const profileUpdateHandler = async ()=>{

    if(!window.confirm( "Agree updated Proile")) return 
   
try{ 
let response = await axios.put(`${apiUrl}/profile/${state?.user?._id}`,{

  firstName:firstName,
  lastName:lastName
},{withCredentials:true})

console.log(response,"response")
}

catch(e){

  console.log(e,"error in api call")
}

  }


  return (
    <>

      <h1>Profile{state?.user?.firstName} </h1>
      <input type="text" placeholder='First Name' value={firstName} onChange={(e) => { setfirstName(e.target.value) }}/>
      <br/>
      <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => { setlastName(e.target.value) }}  />
      <br/>
      <input type="text" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }}  />
      <br/>
      <button type='submit'onClick={profileUpdateHandler} >update</button>



    </>
  )
}
export default Profile