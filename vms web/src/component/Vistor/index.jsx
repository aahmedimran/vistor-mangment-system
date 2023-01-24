import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './index.css'
import axios from 'axios'
import Deportmentpagination from '../Deportment/Deportmentpagination'
const Vistor = () => {
  const [getVistors, setgetVistors] = useState([])
  // filterData
  const [filterData] = useState("");
  // use for pagination
  const [currantPage, setcurrantPage] = useState(1)
  const [postPerpage] = useState(5)

  // Get currant page

  const indexOfLastPost = currantPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const currantPost = getVistors.slice(indexOfFirstPost, indexOfLastPost);


  useEffect(() => {

    const getVistor =async () => {

      try {
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api//Getvistor`, { withCredentials: true })

        if (response.status === 200) {
          // console.log("response : ", response.data);

          // setloading(false)

          setgetVistors(response.data.data.reverse())

        } else {
          console.log("Error in api call: ");
        }
      }
      catch (e) {

        console.log(e, "error")
      }


    }
    getVistor()


  }, [])




  return (
    <>

      <div>
        <h1>Vistor Mengment</h1>
        <div><Link to="/">Dashboard</Link> /<Link>Vistor</Link> </div>
      </div>
      <div className='vistor-main'>
        <div className='vistor-main-firstchild'>
          <div><p> Vistor Mengment</p></div>
          <div className='vistor-main-firstchild'>
            <div>
              <input type="text" name="" id="" />
            </div>
            <div>
              <button type='submit'>Clear filter</button>
              <button type='submit'>CSV</button>
              <button type='submit'>Add</button>
            </div>
          </div>
        </div>
        <div className='vistor-main-secondchild'>
          <div className=''>
            <label for="cars">Show</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <span>entries</span>
          </div>
          <div>
            <label htmlFor="">Search</label>
            <input type="text" placeholder='search' />
          </div>
        </div>
      </div>
      <div className='table-main'>
        <table id='content'>
          <tbody >
            <tr>
              <th>Vistor Name</th>
              <th>Meet Person</th>
              <th>Deportment</th>
              <th>In Date</th>
              <th>Out Date</th>
              <th>Status</th>
              <th>Enter by</th>
              <th>Action</th>
            </tr>
            {/* all add on condinoly  */}
            {currantPost.filter(
              (vistor) =>
                vistor.deportment.toLowerCase().includes(filterData)
                || vistor.vistorName.toLowerCase().includes(filterData)
                || vistor.meetPersonName.toLowerCase().includes(filterData)
            )
              .map((vistor) => (
                <tr key={vistor._id}>
                  <td>{vistor?.vistorName}</td>
                  <td>{vistor?.meetPersonName}</td>
                  <td>{vistor?.deportment}</td>
                  <td>{moment(vistor?.createdAt).format('l LT')}</td>

                 { console.log(vistor.status,"vistor🚗🚗🚗🚗🚗🚗🚗")}



                  <td> {moment(vistor?.updatedAt).format('l LT')}</td>
                  <td style={{  backgroundColor: 'white',color: 'red'}}>{vistor.status}</td>
                  <td>{vistor?.enterBy} </td>
                  <td>  <button type='submit'  >Edit</button>
                    <button type='submit'>Delate</button></td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>
      <Deportmentpagination postPerpage={postPerpage} totalPosts={getVistors.length}
        setcurrantPage={setcurrantPage} />



    </>
  )
}

export default Vistor