import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../Context/context'
import './index.css'



const Dashboard = () => {
const {state} = useContext(GlobalContext)

  return (
    <>

      <div><h1>Analytics {state?.user?.adminId}</h1></div>
      <div><p>Dashboard</p></div>
      <div className='Dashboard-data'>
        <div className='Dashboard-data-chalid'>Total today Vistor</div>
        <div className='Dashboard-data-chalid'>Total yestraday Vistor</div>
        <div className='Dashboard-data-chalid'>Total last 7 day Vistor</div>
        <div className='Dashboard-data-chalid'>Total till day Vistor</div>
      </div>
    </>
  )
}

export default Dashboard