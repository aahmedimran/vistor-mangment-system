import React, { useState } from 'react'

const UservistorCompfrom = () => {

  const [inputValues, setInputValues] = useState({

    vistorName: '',
    email: '',
    mobileNo: '',
    vistorAddress: '',
    deportment: '',
    personToMeet: '',
    reasonToVisit: ''
  })

  console.log(inputValues, "inputValues")

  return (
    <>
      <h1>Get Appontment</h1>

      <form action="">

        <div>
          <div>Vistor Name</div>
          <div><input type="text" value={inputValues.vistorName} onChange={(e) => { setInputValues({ ...inputValues, vistorName: e.target.value }) }} /></div>
        </div>
        <div>
          <div>Vistor Email</div>
          <div><input type="email" value={inputValues.value} onChange={(e) => { setInputValues({ ...inputValues, email: e.target.value }) }} /></div>
        </div>
        <div>
          <div>Vistor Mobile No.</div>
          <div><input type="text" value={inputValues.mobileNo} onChange={(e) => { setInputValues({ ...inputValues, mobileNo: e.target.value }) }} /></div>
        </div>
        <div>
          <div>Vistor Address</div>
          <div><input type="text" value={inputValues.vistorAddress} onChange={(e) => { setInputValues({ ...inputValues, vistorAddress: e.target.value }) }} /></div>
        </div>
        <div>
          <div>Deportment</div>
          <div><input type="text" value={inputValues.deportment} onChange={(e) => { setInputValues({ ...inputValues, deportment: e.target.value }) }} /></div>
        </div>
        <div>
          <div>Person to meet</div>
          <div><input type="text" value={inputValues.personToMeet} onChange={(e) => { setInputValues({ ...inputValues, personToMeet: e.target.value }) }} /></div>
        </div>
        <div>
          <div>Reason to Visit</div>
          <div><input type="text" value={inputValues.reasonToVisit} onChange={(e) => { setInputValues({ ...inputValues, reasonToVisit: e.target.value }) }} /></div>
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default UservistorCompfrom