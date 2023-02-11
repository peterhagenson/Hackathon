import { borderBottom } from '@mui/system';
import { useState, useEffect } from 'react'
import Search from './Search.js'
import EmployeeDetail from './EmployeeDetail.js'

const lastProfileElement = {
  paddingBottom: '10px',
  //borderRight: 'solid'
}

const headingDiv = {
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: '25px',
  paddingTop: '35px',
  paddingRight: '25px',
  color: '#46494d'
}

const detailsDiv = {
  width: 'fit-content',
  margin: '0 auto 20px',
  paddingLeft: '25px',
  paddingRight: '25px',
  color: '#46494d'
}

const propertyStyle = {
  fontStyle: 'italic',
  fontSize: '12pt',
  marginBottom: '7px'
}

const valueStyle = {
  fontStyle: 'normal',
  fontSize: '14pt'

}
const flexThat = {
  display: 'flex',
  
}

function Profile(){
    const user = JSON.parse(localStorage.getItem("user"));
    //let [managers, setManagers] = useState([]);
    //let [reports, setReports] = useState([]);
    let directReports = ""
    for (let rep of user.Reports) {
        directReports += `&reports=${rep}`;
    }

    async function getManagers(){
      console.log('in get managers')
        await fetch(`http://localhost:5000/managers`, {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true
             
         })
         .then((response) => response.json())
         .then((employees) => {
          console.log('test', employees)
             localStorage.setItem("managers", JSON.stringify(employees));
            // setManagers(employees)
    })}

    async function getReports(){
        await fetch(`http://localhost:5000/reports?role=${user.role}${directReports}`, {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true
             
         })
         .then((response) => response.json())
         .then((employees) => {
             localStorage.setItem("reports", JSON.stringify(employees));
             //setReports(employees)
    })}

   
    let hasManager = false;
    let userManager;
    let hasReports = false;
    let reportsDiv = "";
    const managers = JSON.parse(localStorage.getItem('managers')||'[]')

    console.log(localStorage.getItem("managers"))
    if (user.Manager.length > 0) {
        hasManager = true;
        for (let ma of managers) {
            if (ma.employee_id == user.Manager[0]) {
                userManager = ma.name;
            }
        }
    }
    const employees = JSON.parse(localStorage.getItem('employeesList')||'[]')
    if (user.Reports.length > 0) {
        hasReports = true;
        for (let r of user.Reports) {
            for (let e of employees) {
                if (r === e.employee_id) {
                    console.log(e.name);
                    reportsDiv += e.name + " ";
                    continue;
                }
            }
        }
    }
    let formattedSalary = user.Salary.toLocaleString("en-US");
    console.log(formattedSalary);
    useEffect(()=>{
      getManagers();
      getReports();
  },[])
    return (
        <>
        <div style={flexThat}>
      <div style={{width:'25%', borderRight: 'solid', borderWidth: 'thin', borderColor: '#46494d', height: '100vh'}}>
        <div style={headingDiv}>
          <h3>Welcome to your profile, {user.name}!</h3>
        </div>
       <div style={detailsDiv}>
        <div style={propertyStyle}>Employee Name: <span style={valueStyle}>{user.name}</span></div>
        <div style={propertyStyle}>Location: <span style={valueStyle}>{user.location}</span></div>
        <div style={propertyStyle}>Role: <span style={valueStyle}>{user.role}</span></div>
        <div style={propertyStyle}>Phone Number: <span style={valueStyle}>{user.phone}</span></div>
        <div style={propertyStyle}>Salary: <span style={valueStyle}>${formattedSalary}</span></div>
        {hasManager && (<div style={propertyStyle}>Reports to: <span style={valueStyle}>{userManager}</span></div>)}
        {hasReports && (<div style={propertyStyle}>Direct Reports: <span style={valueStyle}>{reportsDiv}</span></div>)}
        </div>
        <div style={lastProfileElement}></div>
      </div>
      <div style={{width:'75%', height: '100vh'}}>
        <Search />
      </div>
      </div>
    </>

  )
}

export default Profile