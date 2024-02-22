import React from 'react'
import { data } from '../dumyData'
import TableTitleList from './TableTitleList'

export default function TableComponent() {
  const [objectKeys, setObjectKeys] = React.useState([])
  const [tableData, setTableData] = React.useState([])
  const [show, setShow] = React.useState(false)
  const [checkedTitle, setCheckedTitle] = React.useState([])
  React.useEffect(() => {
    setObjectKeys(Object.keys(data[0]))
    setTableData(data)
    setCheckedTitle(Object.keys(data[0]))
  }, [])
  return (
    <>
        <div className="container">
          {/* table container start */}
          <div className="table-container">
            <div className='list-container'>
              {/* table title starts */}
              <div className="table-title" style={{position: "relative"}}>
                <h5>Table title</h5>
                <i onClick={() => setShow(!show)} className="fas fa-bars" style={{cursor: "pointer", marginRight: "1rem"}}></i>
                {show ? <TableTitleList 
                setObjectKeys={setObjectKeys}
                checkedTitle={checkedTitle}
                setCheckedTitle={setCheckedTitle} 
                setTableData={setTableData}
                /> : <></>}
              </div>
              {/* table title ends */}
              {/* table data starts  */}
              <div className="list-title" style={{fontWeight: "bolder"}}>
                {/* Adding table title */}
                {
                  objectKeys.slice(1).map((value, index) => <p style={{width: "8rem"}} key={index} className='list-title'>{value}</p>)
                }
              </div>
            {
              // Taking one row at each iteration from data. Check dumyData.js file.
              tableData.map(value => <div key={value.id} className='list-title' style={{textAlign: "center", padding: ".5rem 0", borderBottom: "1px solid #E9EAEC"}}>
                {
                  // Geting all values of object property except id
                  Object.values(value).slice(1).map(((val, index) => <div key={index}>
                  {
                    // Checking if the value is selectbox to show the selectbox
                    val === "selectbox" ? <select style={{width: "8rem", padding: "0.5rem", borderRadius: "0.3rem", border: "none"}}>
                      <option value="pending">Pending</option>
                      <option value="draft">Draft</option>
                      {/* // Checking if the value is action to show the action buttons */}
                    </select> : val === "action" ? <>
                    <div style={{width: "8rem", cursor: "pointer"}}>
                      <div style={{background: "#8000FF", display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0.3rem", padding: "0.5rem"}}>
                        <i style={{color: "gray"}} className="fas fa-pen-to-square"></i>
                        <p style={{color: "white", marginLeft: "10px"}}>Edit</p>
                      </div>
                    </div>
                    </> : <><p style={{width: "8rem"}}>{val}</p></>
                  }
                  </div>))
                }
              </div>)
            }
            </div>
          {/* table data ends */}
          </div>
          
          {/* table container ends */}
        </div>
    </>
  )
}
