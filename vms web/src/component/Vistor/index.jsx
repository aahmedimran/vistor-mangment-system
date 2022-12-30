import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
const Vistor = () => {




  return (
    <>

      <div>
        <h1>Vistor Mengment</h1>
        <div><Link to="/">Dashboard</Link> /<Link>Vistor</Link> </div>
      </div>
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

export default Vistor