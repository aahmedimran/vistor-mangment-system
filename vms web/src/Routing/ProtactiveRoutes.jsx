import React,{useContext} from 'react'
import { Outlet,Navigate } from 'react-router'
import { GlobalContext } from '../Context/context';


const Protactiveroutes = () => {
  let { state } = useContext(GlobalContext);

  const user = state.user

  return  user ?  <Outlet/> : <Navigate to="/"/> 
}

export default Protactiveroutes