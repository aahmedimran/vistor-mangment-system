import React,{useContext} from 'react'
import { GlobalContext } from '../../Context/context'


import './index.css'
const Dashboard = () => {

const {state} = useContext(GlobalContext)

  return (
    <>
<div><h1>Analytics</h1></div>
<div><p>Dashboard</p></div>
<div className='Dashboard-data'>
<div className='Dashboard-data-chalid1'>{state?.user?.firstName}</div>
<div className='Dashboard-data-chalid1'>Total today Vistor</div>
<div className='Dashboard-data-chalid2'>Total yestraday Vistor</div>
<div className='Dashboard-data-chalid3'>Total last 7 day Vistor</div>
<div className='Dashboard-data-chalid4'>Total till day Vistor</div>
</div>
    </>
  )
}

export default Dashboard