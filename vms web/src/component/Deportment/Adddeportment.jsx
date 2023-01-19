import React, { useState, useContext } from 'react'
// import { useCallback } from 'react'
import { HandleAddDeportment } from '../../services/services';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../Context/context';
import { useNavigate } from 'react-router';


const Adddeportment = () => {
  const navigate = useNavigate()
  const { state } = useContext(GlobalContext)
  const [deportmentName, setdeportmentName] = useState('')
  const [contactPersons, setinputs] = useState([{ contactPersons: '' }])

  const handleInputvalue = (e, index) => {
    const { name, value } = e.target
    const list = [...contactPersons]
    list[index][name] = value;
    setinputs(list)
  }

  const removeInputField = (index) => {
    const list = [...contactPersons];
    list.splice(index, 1)
    setinputs(list)
  }



  let contactPerson = contactPersons.map(function (obj) {
    return obj.contactPersons;
  });
  console.log(contactPerson, "contactPerson");

  const handleAddDeportment = async (e) => {
    e.preventDefault()
    if (!deportmentName) {
      toast.error("Please enter Deportment Name")
      return
    }
    console.log(contactPerson.value, "contactPerson.value");
    if (!contactPerson) {
      console.log(contactPerson, "contactPerson");
      toast.error("Please enter Contact Person")
      return
    }
    const response = await HandleAddDeportment({
      deportmentName,
      contactPerson,
      createdBy: state.user._id
    })
    if (response) {
      navigate('/Deportment')
    }
  }

  return (
    <>
      <form onSubmit={handleAddDeportment}>
        <p>Deportment Name</p>
        <input type="text" placeholder='Deportment Name' onChange={(e) => { setdeportmentName(e.target.value) }} />
        <br />
        <p>Contact Person</p>
        {
          contactPersons.map((inputes, index) => (
            <div key={index}>

              <input type="text"
                name='contactPersons'
                value={inputes.contactPersons}
                onChange={(e) => { handleInputvalue(e, index) }}
              />
              {index === 0 ? <></> :
                <button type='dubmit' onClick={() => removeInputField(index)}>del</button>}
            </div>
          ))
        }
        <br />
        <button type='submit'>Add Deportment</button>
      </form>
      <button onClick={(e) => { setinputs([...contactPersons, { contactPersons: '' }]) }} disabled={contactPersons.length >= 4}>add more</button>


    </>
  )
}

export default Adddeportment



