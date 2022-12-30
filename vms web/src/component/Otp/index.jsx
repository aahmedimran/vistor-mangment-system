import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './index.css'
import OTPInput from "otp-input-react";
// import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/context';

const Otp = () => {
const {state} = useContext(GlobalContext)
  const apiUrl = process.env.REACT_APP_BASE_URL
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate()

  
  const user = state.user

  useEffect(() => {

    if (user) {
      navigate("/")
    }
  }, [navigate, user])







  const handleChange = async (e) => {
    e.preventDefault();
    if (!OTP) {
      return
    }
    try {

      const response = await axios.post(`${apiUrl}/verifyOTP`, {
        otp: OTP,
        email: localStorage.getItem('email')
      })
      console.log(response, "response")
      navigate("/login")
    }
    catch (e) {
      console.log("error in api call", e)

    }
  }
  

  return (
    <>
      <div>
        <form onSubmit={handleChange}>

          <OTPInput
            value={OTP}
            onChange={setOTP }
            autoFocus
            OTPLength={6}
            otpType="string"
            disabled={false}
            secure
          />
          <button>verify</button>
        </form>

      </div>





    </>

  )
}

export default Otp


