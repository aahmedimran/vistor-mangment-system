import React, { useState, useContext } from 'react'
import { HandleAddDeportment } from '../../services/services';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../Context/context';
import { useNavigate } from 'react-router';


const Adddeportment = () => {
  const navigate = useNavigate()
  const { state } = useContext(GlobalContext)
  const [deportmentName, setdeportmentName] = useState('')
  const [contactPerson, setcontactPerson] = useState('')
  const handleAddDeportment = async (e) => {
    e.preventDefault()
    if (!deportmentName) {
      toast.error("Please enter Deportment Name")
      return
    }
    if (!contactPerson) {
      toast.error("Please enter Contact Person")
      return
    }
  const response = await HandleAddDeportment({
        deportmentName,
        contactPerson,
        updatedAt:  Date.now(),
        createdBy: state.user._id
      })
      if (response) {
        navigate('/Deportment')
      }
    }


return (
  <>
    <form onSubmit={ handleAddDeportment}>
      <p>Deportment Name</p>
      <input type="text" placeholder='Deportment Name' onChange={(e) => { setdeportmentName(e.target.value) }} />
      <br />
      <p>Contact Person</p>
      <input type="text" placeholder='Deportment Name' onChange={(e) => { setcontactPerson(e.target.value) }} />
      <br />


      <button type='submit'>update</button>
    </form>



  </>
)
}

export default Adddeportment