import React, { useState, useContext,useEffect } from 'react'
import { GlobalContext } from '../../Context/context'
import { HashLoader } from "react-spinners";
import axios from 'axios'
import './index.css'
const Profile = () => {
  const { state } = useContext(GlobalContext)
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [validFirstName, setValidFirstName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const apiUrl = process.env.REACT_APP_BASE_URL;
const [loading, setloading] = useState(true)

useEffect(() => {
  setfirstName(state?.user?.firstName);
  setlastName(state?.user?.lastName);
  setemail(state?.user?.email);
  
  setTimeout(() => {
    setloading(false)
  }, 500);
}, [state?.user])



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
      let response = await axios.put(`${apiUrl}/api/Profile/${state?.user?._id}`, {

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
{ loading ?

<div className='loader'>
<HashLoader
  color={"#13F513"}
  loading={loading}

  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
</div>

:
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

}

      {/* <div className='profile-container' >
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
      </div> */}
    </>
  )
}
export default Profile