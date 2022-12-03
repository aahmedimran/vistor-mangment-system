import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../Context/context';
import { HandleAddDeportment } from '../../services/services';
import { toast } from 'react-toastify';
import axios from 'axios'
const Deportment = () => {
  const { state } = useContext(GlobalContext)
  const [deportmentName, setdeportmentName] = useState('')
  const [contactPerson, setcontactPerson] = useState('')
   const [getDeportment, setgetDeportment] = useState([])
  const apiUrl = process.env.REACT_APP_BASE_URL


  const handleAddDeportment = async () => {
    if (!deportmentName) {
      toast.error("Please enter Deportment Name")
      return
    }
    if (!contactPerson) {
      toast.error("Please enter Contact Person")
      return
    }



    await HandleAddDeportment({
      deportmentName,
      contactPerson,
      createdBy: state.user._id
    })
  }

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
  }, [apiUrl])



  return (
    <>
      <h1>Deportment Mangment</h1>
      <br />
      <div>
        <form onClick={handleAddDeportment}>
          <p>Deportment Name</p>
          <input type="text" placeholder='Deportment Name' onChange={(e) => { setdeportmentName(e.target.value) }} />
          <br />
          <p>Contact Person</p>
          <input type="text" placeholder='Deportment Name' onChange={(e) => { setcontactPerson(e.target.value) }} />
          <button type='submit' >update</button>
        </form>
      </div>
<div>
{getDeportment.map(getallDeportment => (

<div key={getallDeportment._id}>
  
  <div> {getallDeportment.deportmentName}</div>
    <div> {getallDeportment.contactPerson}</div>
  <div> {getallDeportment.creeatedOn}</div>
 


 </div>






))


}


</div>


    </>
  )
}

export default Deportment