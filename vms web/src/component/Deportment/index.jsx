import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import { useNavigate } from 'react-router'

const Deportment = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const [getDeportment, setgetDeportment] = useState([])
  const [togllReload, settogllReload] = useState(true)
  const [editDeportment, seteditDeportment] = useState(null)

  useEffect(() => {
    let getDeportment = async () => {
      try {
        let response = await axios.get(`${apiUrl}/deportment`, { withCredentials: true })

        if (response.status === 200) {
          console.log("response : ", response.data);
          setgetDeportment(response.data.data.reverse())
        } else {
          console.log("Error in api call: ");
        }
      } catch (e) {
        console.log("Error in api call: ", e);
      }
    }
    getDeportment();
  }, [apiUrl, togllReload])

  console.log(editDeportment, "editDeportment")

  return (
    <>

      {(editDeportment !== null) ? (<div>

        <input type="text" value={editDeportment.deportmentName} onChange={(e) => { seteditDeportment({ ...seteditDeportment, deportmentName: e.target.value }) }} />
        <br />
        <input type="text" value={editDeportment.contactPerson} onChange={(e) => { seteditDeportment({ ...seteditDeportment, contactPerson: e.target.value }) }} />


      </div>)
        :
        null}
      {/* <input type="text"  value={editDeportment.deportmentName}  onChange={(e) => { seteditDeportment({ ...seteditDeportment, deportmentName: e.target.value }) }} />
      <br />
      <input type="text" value={editDeportment.contactPerson}   onChange={(e) => { seteditDeportment({ ...seteditDeportment, contactPerson: e.target.value }) }} /> */}











      <h1>Deportment Mangment</h1>
      <br />
      <div>
        <button onClick={() => { navigate('/Adddeportment') }}>Add</button>

      </div>
      <div>
        <div>
          <p>Deportment Mangment</p>
          <div className='deportment-main-header'>
            <div>
              <label htmlFor="item">Item:</label>
              <select name="cars" id="cars">
                <option value="1">{getDeportment.length}</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Search.." />
            </div>
          </div>
         <div>
          <table>
            <tbody>
              <tr>
                <th>Deportment Name</th>
                <th>Contact Person</th>
                <th>Creeated On</th>
                <th>Updated By</th>
                <th>Action</th>
              </tr>
              {getDeportment.map(getallDeportment => (
                <tr key={getallDeportment._id}>
                  <td>{getallDeportment.deportmentName}</td>
                  <td>{getallDeportment.contactPerson}</td>
                  <td> {getallDeportment.creeatedOn}</td>
                  <td>{getallDeportment.updatedAt}</td>
                  <td>  <button type='submit' onClick={async () => {
                    seteditDeportment(
                      {
                        _id: getallDeportment._id,
                        deportmentName: getallDeportment.deportmentName,
                        contactPerson: getallDeportment.contactPerson
                      })
                  }} >Edit</button>
                    <button type='submit' onClick={async () => {
                      try {
                        let response = await axios.delete(`${apiUrl}/deportment/${getallDeportment?._id}`, { withCredentials: true })
                        console.log(response, "response")
                        settogllReload(!togllReload)
                      }
                      catch (e) {
                        console.log(e, "error in api call")
                      }
                    }}>Delate</button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
          </div>
        </div>

      </div>


    </>
  )
}

export default Deportment