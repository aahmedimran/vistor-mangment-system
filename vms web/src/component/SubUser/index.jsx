import React, { useState } from 'react'
import './index.css'
const Subuser = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validUserName, setValiduserName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userName) {
      setValiduserName(true)
      return
    }
    if (!email) {
      setValidEmail(true)
      return
    }
    if (!password) {
      setValidPassword(true)
      return
    }
    console.log('userName', userName)
    console.log('email', email)
    console.log('password', password)

  }




  return (
    <>

      <div className='subuser-container' >
        <div className='subuser-main'>
          <p>Sub User Mangment</p>
          <form className='subuser-from' onSubmit={handleSubmit}>

            <div className='subuser-inputs'>
              <label htmlFor="User name">User name</label>
              <input placeholder='Subuser Name' type='text'


                onChange={
                  (e) => {
                    setUserName(e.target.value)
                    setValiduserName(false)
                  }

                } />
            </div>
            <div className='subuser-input-usererror'>
              {validUserName === true ? <span>Please enter Name</span> : <p></p>}
            </div>
           
            <div className='subuser-inputs'>
              <label htmlFor="Email"  >Email</label>
              <input placeholder='Email' type='email' onChange={(e) => {
                setEmail(e.target.value)
                setValidEmail(false)
              }} />
            </div>
            <div className='subuser-input-Emailerror'>
              {validEmail === true ? <span>Please enter Email</span> : <p></p>}
            </div>
            <div className='subuser-inputs'>
              <label htmlFor="" >Password</label>
              <input placeholder='password' type='password' onChange={(e) => {
                setPassword(e.target.value)
                setValidPassword(false)
              }} />
            </div>
            <div className='subuser-input-Passworderror'>
              {validPassword === true ? <span>Please enter Password</span> : <p></p>}
            </div>
            <button className='subuser-btn' type='submit'>add User</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Subuser