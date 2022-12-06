import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Dashboard from '../component/Dashboard';
import Deportment from '../component/Deportment';
import Login from '../component/Login';
import Navbar from '../component/Navbar'
import Profile from '../component/Profile';
import Signup from '../component/Signup';
import Vistor from '../component/Vistor';
import Subuser from '../component/SubUser';
import { GlobalContext } from '../Context/context';
import Adddeportment from '../component/Deportment/Adddeportment';




const Approutes = () => {

  const { state } = useContext(GlobalContext)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {(state.isLogin === true) ?
            <>
              <Route path="/Deportment" element={<Deportment />} />
              <Route path="/Adddeportment" element={<Adddeportment />} />
              <Route path="/Subuser" element={<Subuser />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Vistor" element={<Vistor />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>

            :
            null

          }

          {(state.isLogin === false) ?
            <>

              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />

              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/Login" />} />


            </>

            :
            null

          }


          {(state.isLogin === null) ?

            <>
              Loading...
            </>
            :
            null
          }

        </Routes>
      </Router>







      {/* <BrowserRouter>
                <Navbar />
                <div className="App">
                    <Routes>

                        <Route element={<Protactiveroutes />}>
                            <Route element={<Profile />} path='/Profile' />
                            <Route element={<Vistor />} path='/Vistor' />
                            <Route element={<Subuser />} path='/Subuser' />
                            <Route element={<Deportment />} path='/Deportment' />

                        </Route>
                        <Route>
                            <Route element={<Dashboard />} path='/' />
                            <Route element={<Login />} path='/Login' />
                            <Route element={<Signup />} path='/Signup' />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter> */}

    </>
  )
}
export default Approutes