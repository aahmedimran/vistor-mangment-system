import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../Context/context'
import axios from 'axios'
import './index.css'
const Profile = () => {
  const { state } = useContext(GlobalContext)
  const [firstName, setfirstName] = useState(state?.user?.firstName)
  const [lastName, setlastName] = useState(state?.user?.lastName)
  const  [email, setemail] = useState(state?.user?.email)
  const [validFirstName, setValidFirstName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const apiUrl = process.env.REACT_APP_BASE_URL;






  const profileUpdateHandler = async () => {

    if (!firstName) {
      setValidFirstName(true)
      return
    }
    if (!lastName) {
      setValidLastName(true)
      return
    }
    if (!window.confirm(`Agree updated Proile`)) {
      return
    }
    try {
      let response = await axios.put(`${apiUrl}/profile/${state?.user?._id}`, {

        firstName: firstName,
        lastName: lastName
      }, { withCredentials: true })

      console.log(response, "response")

    }
    catch (e) {
      console.log(e, "error in api call")
    }

  }

  return (
    <>
      <div className='profile-container' >
        <div className='profile-main'>
          <div className='profile-from'>
            <h1>User Profile</h1>
            <div className='profile-inputs'>
              <label htmlFor="">First Name</label>
              <input type="text" placeholder='First Name' value={firstName} onChange={(e) => { setfirstName(e.target.value) }} />
            </div>
            <div className='subuser-input-usererror'>
              {validFirstName === true ? <span>Please enter Name</span> : <p></p>}
            </div>
            <div className='profile-inputs'>
              <label htmlFor="">Last name</label>
              <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => { setlastName(e.target.value) }} />
            </div>
            <div className='subuser-input-usererror'>
              {validLastName === true ? <span>Please enter Name</span> : <p></p>}
            </div>
            <div className='profile-inputs'>
              <label htmlFor="">Email</label>
              <input type="text" placeholder='Email' disabled value={email} onChange={(e) => { setemail(e.target.value) }} />
            </div>
            <button type='submit' className='profile-btn' onClick={profileUpdateHandler} >update</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile