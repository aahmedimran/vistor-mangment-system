import React from 'react'
import { Link } from "react-router-dom";
import './index.css'
import { useContext } from "react";
import { GlobalContext } from '../../Context/context';
import { LogoutHandler } from '../../services/services';

const Navbar = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const logoutHandler = async () => {
    const response = await LogoutHandler({})
    if (response) {
      dispatch({ type: "USER_LOGOUT" });
    }

  };

  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">

            {(state.isLogin === true) ?
              <>
                <li><Link to="/">Dashboard</Link></li>
                <li> <Link to="/Profile">Profile </Link></li>
                <li> <Link to="/Vistor">Vistor</Link></li>
                <li><Link to="/Subuser"> Subuser</Link></li>
                <li><Link to="/Deportment"> Deportment</Link> </li>
                <li> <Link to="/login" onClick={logoutHandler}>logout</Link></li>
              </>
              :
              null
            }

            {(state.isLogin === false) ?
              <>
                <li><Link to="/">Dashboard</Link> </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signUp">SignUp</Link></li>
              </>
              :
              null
            }


            {

              (state.isLogin === null) ?

                <div>Loading....</div>
                :
                null
            }


            {/* {(state.isLogin === true) ?
              <>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/Subuser">Subuser</Link></li>
                <li><Link to="/Deportment">Deportment</Link></li>
                <li><Link to="/Vistor">Vistor</Link></li>
                <li><Link to="/Profile" >Profile</Link></li>
                <li ><Link to="/Login" onClick={handleLogout}>Logout</Link></li>
              </>
              :
              null
            }
            {(state.isLogin === false) ?
              <>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/Login"  >Login</Link></li>
                <li><Link to="/Signup"  >Signup</Link></li>

              </>
              :
              null
            }
            {(state.isLogin === null) ?
              <>
                <h1>Loading</h1>
              </>
              :
              null
            }
 */}
          </ul>
          <h1 className="logo">VMS</h1>
        </div>
      </nav>

    </>
  )
}

export default Navbar