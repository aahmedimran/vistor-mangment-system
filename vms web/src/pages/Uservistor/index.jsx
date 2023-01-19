import axios from 'axios'
import moment from 'moment'
import React,{useState,useEffect,useContext} from 'react'
import Deportmentpagination from '../../component/Deportment/Deportmentpagination'
import UservistorCompfrom from '../../component/Deportment/userVistor'
import { GlobalContext } from '../../Context/context'

const Uservistor = () => {
const {state} = useContext(GlobalContext)

const [getDeportments, setgetDeportments] = useState([])

 // filterData
 const [filterData] = useState("");
// use for pagination
const [currantPage, setcurrantPage] = useState(1)
const [postPerpage] = useState(5)

 // Get currant page

 const indexOfLastPost = currantPage * postPerpage;
 const indexOfFirstPost = indexOfLastPost - postPerpage;
 const currantPost = getDeportments.slice(indexOfFirstPost, indexOfLastPost);



useEffect(() => {
  let getDeportments = async ()=>{
try{
    let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/GetDeportmentspacific/${state.user.adminId}`, { withCredentials: true })
if(response.status === 200){
    console.log(response.data,"response")
    setgetDeportments(response.data.data.reverse())
}
}
catch(e){
    console.log(e,"error on api call")
}


  }

  getDeportments()

}, [state.user.adminId])





    return (
        <>
            <UservistorCompfrom />
            <div className='vistor-main'>
                <div className='vistor-main-firstchild'>
                    <div><p> Vistor Mengment</p></div>
                    <div className='vistor-main-firstchild'>
                        <div>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <button type='submit'>Clear filter</button>
                            <button type='submit'>CSV</button>
                            <button type='submit'>Add</button>
                        </div>
                    </div>
                </div>
                <div className='vistor-main-secondchild'>
                    <div className=''>
                        <label for="cars">Show</label>
                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div>
                        <label htmlFor="">Search</label>
                        <input type="text" placeholder='search' />
                    </div>
                </div>


                <div className='table-main'>
        <table id='content'>
          <tbody >
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Creeated On</th>
              <th>Updated By</th>
              <th>Action</th>
            </tr>
            {/* all add on condinoly  */}
            {currantPost.filter(
              (deportment) =>
              deportment.deportmentName.toLowerCase().includes(filterData)
              
            )
              .map((deportment) => (

                <tr key={deportment._id}>
                  <td>{deportment?.key}</td>
                  <td>{deportment?.deportmentName}</td>
                  <td>{deportment?.contactPerson}</td>
                  <td> {moment(deportment.createdAt).format('l LT')}</td>
                  <td>{moment(deportment.updatedAt).format('L LT')}</td>
                  <td>  <button type='submit'  >Edit</button>
                    <button type='submit'>Delate</button></td>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>


      <Deportmentpagination postPerpage={postPerpage} totalPosts={getDeportments.length}
        setcurrantPage={setcurrantPage} />










                <div>
                    <table id='content'>
                        <tbody >
                            <tr>
                                <th>Vistor Name</th>
                                <th>Meet Person</th>
                                <th>Deportment</th>
                                <th>In Date</th>
                                <th>Out Date</th>
                                <th>Status</th>
                                <th>Enter by</th>
                                <th>Action</th>
                            </tr>


                            <tr>
                                <td>sunny</td>
                                <td>shayan</td>
                                <td> It</td>
                                <td>22</td>
                                <td>22</td>
                                <td><button>true</button></td>
                                <td>sunny</td>
                                <td><button>view</button><button>del</button></td>
                            </tr>

                        </tbody>
                    </table>
                </div>




            </div>
        </>
    )
}

export default Uservistor