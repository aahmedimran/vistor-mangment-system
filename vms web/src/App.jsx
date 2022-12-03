import Approutes from './Routing/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useContext } from 'react';
import { GlobalContext } from './Context/context';
import axios from 'axios'


function App() {
const {dispatch} = useContext(GlobalContext)
  const apiUrl = process.env.REACT_APP_BASE_URL;



useEffect(() => {
  
  const getProfile = async () => {
 
    try {
      let response = await 
     
      axios.get(`${apiUrl}/profile`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("response : ", response.data);

        dispatch({ type: "USER_LOGIN", payload: response.data });
      } else {
        dispatch({ type: "USER_LOGOUT" });
      }
    } catch (e) {
      console.log("Error in api call: ", e);
      dispatch( {type : "USER_LOGOUT"});
    }
  }

getProfile();
}, [apiUrl, dispatch]);




  return (
    <>
      <Approutes />
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
