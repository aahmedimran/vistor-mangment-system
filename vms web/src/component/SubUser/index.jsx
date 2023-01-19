import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import './index.css'
import { GlobalContext } from '../../Context/context'
import Deportmentpagination from '../Deportment/Deportmentpagination'
const Subuser = () => {

  const { state } = useContext(GlobalContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState(''.toLowerCase())
  const [password, setPassword] = useState('')
  const [getSubUsers, setGetSubUsers] = useState([])

  const [validUserName, setValiduserName] = useState(false)
  const [validlastName, setValidlastName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  // filterData
  const [filterData] = useState("");
  // use for pagination
  const [currantPage, setcurrantPage] = useState(1)
  const [postPerpage] = useState(5)

  // Get currant page

  const indexOfLastPost = currantPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const currantPost = getSubUsers.slice(indexOfFirstPost, indexOfLastPost);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!firstName) {
      setValiduserName(true)
      return
    }
    console.log(email,"email");
    if (!email) {
      setValidEmail(true)
      return
    }
    if (!password) {
      setValidPassword(true)
      return
    }
    try {
      let response = await
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/SubUserSignUp`,
          {
            firstName,
            lastName,
            email,
            password,
            adminId: state.user._id
},{ withCredentials: true })
      console.log("response : ", response.data);
    } catch (e) {
      console.log("Error in api call: ", e);
    }

  }
  useEffect(() => {

    let getSubUser = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/GetUsers/${state.user._id}`, { withCredentials: true })
        if (response.status === 200) {
          console.log("response : ", response.data);

          // setloading(false)

          setGetSubUsers(response.data.data.reverse())

        } else {
          console.log("Error in api call: ");
        }
      } catch (e) {
        console.log("Error in api call: ", e);
      }
    }
    getSubUser();
  }, [state.user._id])
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
                    setFirstName(e.target.value)
                    setValiduserName(false)
                  }

                } />
            </div>
            <div className='subuser-input-usererror'>
              {validUserName === true ? <span>Please enter Name</span> : <p></p>}
            </div>
            <div className='subuser-inputs'>
              <label htmlFor="User name">User name</label>
              <input placeholder='Subuser Name' type='text'
                onChange={
                  (e) => {
                    setlastName(e.target.value)
                    setValidlastName(false)
                  }

                } />
            </div>
            <div className='subuser-input-usererror'>
              {validlastName === true ? <span>Please enter Name</span> : <p></p>}
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

      <div className='table-main'>
        <table id='content'>
          <tbody >
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Creeated On</th>
              <th>Updated By</th>
              <th>Action</th>
            </tr>
            {/* all add on condinoly  */}
            {currantPost.filter(
              (subUser) =>
                subUser.firstName.toLowerCase().includes(filterData)
                || subUser.lastName.toLowerCase().includes(filterData)
                || subUser.email.toLowerCase().includes(filterData)
            )
              .map((subUser) => (

                <tr key={subUser._id}>
                  <td>{subUser?.key}</td>
                  <td>{subUser?.firstName} {subUser?.lastName}</td>
                  <td>{subUser?.email}</td>
                  <td> {moment(subUser.createdAt).format('l LT')}</td>
                  <td>{moment(subUser.updatedAt).format('L LT')}</td>
                  <td>  <button type='submit'  >Edit</button>
                    <button type='submit'>Delate</button></td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>


      <Deportmentpagination postPerpage={postPerpage} totalPosts={getSubUsers.length}
        setcurrantPage={setcurrantPage} />

    </>
  )
}

export default Subuser