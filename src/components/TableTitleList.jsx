import React from 'react'
import "../App.css"
import { data } from '../dumyData'

function TableTitleList({setObjectKeys, checkedTitle, setCheckedTitle, setTableData}) {
    const [copyTitle, setCopyTitle] = React.useState([])
    const filteredTitle = async value => {
        let filteredTitles;
        if (checkedTitle.indexOf(value) > -1) {
            // Removing the title
            filteredTitles = checkedTitle.filter(val => val !== value);
            // Removing data 
            setTableData(currentTableData =>
                currentTableData.map(row => {
                    const newRow = { ...row };
                    delete newRow[value];
                    return newRow;
                }),
            );
        } else {
            // Adding the title back
            filteredTitles = [...checkedTitle, value];
            // Adding data back
            setTableData(currentTableData =>
                currentTableData.map(row => {
                    const originalRow = data.find(original => original.id === row.id);
                    return { ...row, [value]: originalRow[value] };
                }),
            );
        }
    
        setObjectKeys(filteredTitles);
        setCheckedTitle(filteredTitles);
    };
    React.useEffect(() => {
        setCopyTitle(Object.keys(data[0]))
    }, []) 
  return (
    <>
        {/* Showing the title model to select titile */}
        <div className='table-lists'>
            <p style={{fontWeight: "bolder", fontSize: "15px"}}>Add or remove columns</p>
            {
                copyTitle.slice(1).map((value, index) => <div key={index}>
                    <div style={{
                        display: "flex", 
                        alignItems: "center", 
                        padding: "0.8rem 0.5rem", 
                    }}>
                        <input onClick={() => filteredTitle(value)} defaultChecked={checkedTitle.indexOf(value) > -1} type="checkbox" name="check" id={value} style={{transform: "scale(1.5)"}} />
                        <label style={{marginLeft: "15px", textTransform: "capitalize"}}>{value}</label>
                    </div>
                </div>)
            }
        </div>
    </>
  )
}

export default React.memo(TableTitleList)
