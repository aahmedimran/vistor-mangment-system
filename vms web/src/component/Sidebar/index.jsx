import React, { useState } from 'react'
import './index.css'
import { useContext } from "react";
import { GlobalContext } from '../../Context/context';
import { LogoutHandler } from '../../services/services';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaMapMarkedAlt
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { FcDepartment } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { NavLink } from "react-router-dom";





const Sidebar = (Children) => {

  let { state, dispatch } = useContext(GlobalContext);
  const logoutHandler = async () => {
    const response = await LogoutHandler({})
    if (response) {
      dispatch({ type: "USER_LOGOUT" });
    }

  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);





  return (
    <>
      <div className="container">
        <div style={{ width: isOpen ? "200px" : "70px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">VMS</h1>
            <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* rrrr */}


      

          <ul>

            {(state.isLogin === true) ?
              <div>
                <NavLink to="/">
                  <div className="top_section-dash">

                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} className="bars">
                      <FaTh />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      Dashboard
                    </div>

                  </div>
                </NavLink>
                <NavLink to="/Profile">
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <FaUserAlt />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      Profile
                    </div>

                  </div>
                </NavLink>
                <NavLink to="/Vistor">
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <FaMapMarkedAlt />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      Vistor
                    </div>

                  </div>
                </NavLink>

                <NavLink to="/Subuser">
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <HiUsers />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      Subuser
                    </div>

                  </div>
                </NavLink>


                <NavLink to="/Deportment">
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <FcDepartment />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      Deportment
                    </div>

                  </div>
                </NavLink>

                <NavLink to="/login" onClick={logoutHandler}>
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <BiLogOut />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      logout
                    </div>

                  </div>
                </NavLink>

              </div>

              :
              null
            }

{(state.isLogin === false) ?
              <>
                 <NavLink to="/">
                  <div className="top_section-dash">

                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} className="bars">
                      <FaTh />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                      Dashboard
                    </div>

                  </div>
                </NavLink>
                <NavLink to="/login">
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <MdOutlineLogin />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                    login
                    </div>

                  </div>
                </NavLink>
                <NavLink to="/signUp">
                  <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} >
                      <SiGnuprivacyguard />
                    </div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="icon" >
                    signUp
                    </div>

                  </div>
                </NavLink>
              </>
              :
              null
            }


            {/* {

              (state.isLogin === null) ?

                <div>Loading....</div>
                :
                null
            } */}

          </ul>
        </div>

       {/* <main>{Children}</main> */}
      </div>

    
    </>
  )
}

export default Sidebar

