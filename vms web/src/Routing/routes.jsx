import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '../component/Dashboard';
import Deportment from '../component/Deportment';
import Login from '../component/Login';
import Navbar from '../component/Navbar'
import Profile from '../component/Profile';
import Signup from '../component/Signup';
import Vistor from '../component/Vistor';
import Subuser from '../component/SubUser';
import Adddeportment from '../component/Deportment/Adddeportment';
import Sidebar from '../component/Sidebar';
import Otp from '../component/Otp';
import Protactiveroutes from './ProtactiveRoutes';
import User from '../component/Deportment/userComp/user';
import { GlobalContext } from '../Context/context';
import Any from '../component/Deportment/userVistor';
import Uservistor from '../pages/Uservistor';





const Approutes = () => {


  let { state } = useContext(GlobalContext);

  // const role = state.user.data.role 
  return (
    <>

      <Router>
        <Sidebar />
        <Navbar />
        <div className="App">
          <Routes>

            { <Route element={<Protactiveroutes />}>

              {state?.user?.role  === "admin" ?
                <>

                  <Route element={<Dashboard />} path='/Dashboard' />
                  <Route element={<Profile />} path='/Profile' />
                  <Route element={<Vistor />} path='/Vistor' />
                  <Route element={<Subuser />} path='/Subuser' />
                  <Route element={<Deportment />} path='/Deportment' />
                  <Route element={<Adddeportment />} path='/Adddeportment' />
               
                </>
                :
                <>
                 <Route element={<Dashboard />} path='/Dashboard' />
                  <Route element={<Profile />} path='/Profile' />
                  <Route element={<Uservistor />} path='/Uservistor' />
                <Route element={<User />} path='/User' />
                <Route element={<Any />} path='/Any' />
                </>
              }
            </Route> }



            {/* <Route element={<Protactiveroutes />}>
              <Route element={<Dashboard />} path='/Dashboard' />
              <Route element={<Profile />} path='/Profile' />
              <Route element={<Vistor />} path='/Vistor' />
              <Route element={<Subuser />} path='/Subuser' />
              <Route element={<Deportment />} path='/Deportment' />
              <Route element={<Adddeportment />} path='/Adddeportment' />

            </Route> */}

            <Route>
              {/* <Route element={<Dashboard />} path='/' /> */}
              <Route element={<Login />} path='/' />
              <Route element={<Signup />} path='/Signup' />
              <Route element={<Otp />} path='/Otp' />
            </Route>
          </Routes>
        </div>

      </Router>
    </>
  )
}
export default Approutes
