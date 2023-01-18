import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import { useNavigate } from 'react-router'
import Deportmentpagination from './Deportmentpagination'
import moment from 'moment'
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable' // eslint-disable-line
import { HashLoader } from "react-spinners";


const Deportment = () => {

  const navigate = useNavigate()
  const [getDeportment, setgetDeportment] = useState([])
  const [togllReload, settogllReload] = useState(true)
  const [editDeportment, seteditDeportment] = useState(null)
  const [filterData, setfilterData] = useState("");
  const [loading, setloading] = useState(true)

  // use for pagination
  const [currantPage, setcurrantPage] = useState(1)
  const [postPerpage] = useState(5)



  useEffect(() => {
    let getDeportment = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/GetDeportment`, { withCredentials: true })

        if (response.status === 200) {
          console.log("response : ", response.data);

          setloading(false)

          setgetDeportment(response.data.data.reverse())

        } else {
          console.log("Error in api call: ");
        }
      } catch (e) {
        console.log("Error in api call: ", e);
      }
    }
    getDeportment();
  }, [togllReload])

  // Get currant page

  const indexOfLastPost = currantPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const currantPost = getDeportment.slice(indexOfFirstPost, indexOfLastPost);


  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/UpdateDeportment/${editDeportment._id}`,
        {
          deportmentName: editDeportment.deportmentName,
          contactPerson: editDeportment.contactPerson
        },
        { withCredentials: true })
      console.log(response, "response")
      settogllReload(!togllReload)
      seteditDeportment(null)
    }
    catch (e) {
      console.log(e, "error in api call")
    }


  }


  const pdfGenrate = () => {

    const doc = new jsPDF();
    const date = new moment(Date()).format('L LT')
    doc.setFontSize(30);
    doc.text("Deportment Details",60, 20);
    doc.setFontSize(16);
    doc.text("Date : " + date,125,55)
    const columns = [
      "Deportment Name",
      "Contact Person",
      "Created At",
      "Updated By"

    ];
    const rows = [];
    getDeportment.forEach((item) => {
      const temp = {...item}
      temp.createdAt = moment(temp.createdAt).format('L LT')
      temp.updatedAt = moment(temp.updatedAt).format('L LT')
      delete temp['createdBy']
      delete temp['_id']
      rows.push(Object.values(temp))
    });

    doc.autoTable(columns, rows, {


      pageBreak: 'avoid',
      headerStyles: {
        fillColor: [239, 154, 154],
        textColor: [0, 0, 0],
        halign: 'center'
      },
      bodyStyles: {
        halign: 'center'
      },
      margin: { top: 60 },
      theme: 'striped'
    });
    doc.save("deportment.pdf")

  }
  return (

    <>
      {
        loading ?
          <div className='loader'>
            <HashLoader
              color={"#13F513"}
              loading={loading}

              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          :

          <>

            {(editDeportment !== null) ? (
              <div>

                <form onSubmit={handleUpdate}>

                  <input type="text" value={editDeportment.deportmentName} onChange={(e) => { seteditDeportment({ ...editDeportment, deportmentName: e.target.value }) }} />
                  <br />
                  <input type="text" value={editDeportment.contactPerson} onChange={(e) => { seteditDeportment({ ...editDeportment, contactPerson: e.target.value }) }} />
                  <br />
                  <button type='submit'>update</button>
                </form>
              </div>)
              :
              null}



            <h1>Deportment Mangment</h1>
            <br />




            <div>
              <div>

                <div className='deportment-main-header'>
                  <div>
                    <div className='deportment-main-firstchild' >
                      <label htmlFor="item">Show</label>
                      <input type="text" value={currantPost.length} />
                      <label htmlFor="item">Entities</label>
                    </div>
                    <div className='deportment-serach-input'>
                      <input type="text" placeholder="Search.." onChange={(e) => setfilterData(e.target.value)} />
                    </div>
                  </div>

                  <div className='deportment-main-firstchild-secondchild'>
                    <div>
                      <button onClick={() => { navigate('/Adddeportment') }}>Add Deportment</button>
                    </div>
                    <div>
                      <button onClick={pdfGenrate}>pdf genrate</button>
                    </div>
                  </div>



                </div>
                <div className='table-main'>
                  <table id='content'>
                    <tbody >
                      <tr>
                        <th>Deportment Name</th>
                        <th>Contact Person</th>
                        <th>Creeated On</th>
                        <th>Updated By</th>
                        <th>Action</th>
                      </tr>
                      {/* all add on condinoly  */}
                      {currantPost.filter(
                        (getallDeportment) =>
                          getallDeportment.deportmentName.toLowerCase().includes(filterData)
                        // || getallDeportment.contactPerson.toLowerCase().includes(filterData)

                      )
                        .map((getallDeportment) => (

                          <tr key={getallDeportment._id}>
                            <td>{getallDeportment?.deportmentName}</td>
                            <td>{getallDeportment?.contactPerson}</td>
                            <td> {moment(getallDeportment.createdAt).format('l LT')}</td>
                            <td>{moment(getallDeportment.updatedAt).format('L LT')}</td>
                            <td>  <button type='submit' onClick={async () => {
                              seteditDeportment(
                                {
                                  _id: getallDeportment._id,
                                  deportmentName: getallDeportment.deportmentName,
                                  contactPerson: getallDeportment.contactPerson
                                })
                            }} >Edit</button>
                              <button type='submit' onClick={async () => {
                                try {
                                  let response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/DeleteDeportment/${getallDeportment?._id}`, { withCredentials: true })
                                  console.log(response, "response")
                                  settogllReload(!togllReload)
                                }
                                catch (e) {
                                  console.log(e, "error in api call")
                                }
                              }}>Delate</button></td>
                          </tr>
                        )
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='pagination'>

                <Deportmentpagination postPerpage={postPerpage} totalPosts={getDeportment.length}
                  setcurrantPage={setcurrantPage} />

              </div>
            </div>
          </>
      }
    </>
  )
}

export default Deportment