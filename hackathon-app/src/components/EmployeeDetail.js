import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import TextField from'@mui/material/TextField'

const detailsDiv = {
    width: 'fit-content',
    margin: '0 auto 20px', 
    paddingLeft: '25px',
    paddingRight: '25px',
    marginTop: '100px'
  }

  const propertyStyle = {
    fontStyle: 'italic',
    fontSize: '12pt',
    marginBottom: '3px'
  }  

  const valueStyle = {
    fontStyle: 'normal',
    fontSize: '14pt'

  }

  const styles1 = {
    backgroundColor: "black",
    color: "white",
    border: "3px solid black",
    marginBottom: "13px",
    fontWeight: 'bold',

    '&:hover': {
      border: "3px solid black",
      color: "black",
      backgroundColor: "white",
      fontWeight: 'bold',
      // boxShadow: 20
    }
  }


function EmployeeDetail(){

    

    let id = useParams();
    //console.log(id)
    let [salary, setSalary] = useState(0);
    let [employee, setEmployee] = useState({})
    let [reports, setReports] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")||'{}');
    let reportString = "";
    let managerString = "";
    let hasReports = false;
    if (user.Reports.length > 0) {
        hasReports = true;
        for (let rep of user.Reports) {
            reportString += `&reports=${rep}`;
        }
    }
    if (user.Manager.length > 0) {
        managerString += `&manager=${user.Manager[0]}`;
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(salary)
        updateEmployee(salary);
        setSalary(0)
        //getEmployee();
    }

    async function getEmployee(){
        await fetch(`http://localhost:5000/employees/${id.id}?role=${user.role}${reportString}${managerString}`, {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true
             
         })
         .then((response) => response.json())
         .then((employee) => {
            console.log(employee)
            localStorage.setItem("current", JSON.stringify(employee));
             setEmployee(employee)
            
    })}

    async function updateEmployee(psalary) {
        console.log(psalary);
        await fetch(`http://localhost:5000/employees/update/${id.id}?salary=${psalary}`, {
             method: 'PUT',    
         withCredentials: true,    
             crossorigin: true         
         })
         getEmployee();
    }
    
    let hasManager = false;
    let employeeManager;
    let haveReports = false;
    let reportsDiv = "";
    let currentEmployee = JSON.parse(localStorage.getItem("current") ||'{}')
    const managers = JSON.parse(localStorage.getItem('managers')||'[]')
    const employees = JSON.parse(localStorage.getItem('employeesList')||'[]')
    if (employee.Manager.length > 0) {
        hasManager = true;
        for (let ma of managers) {
            if (ma.employee_id === currentEmployee.Manager[0]) {
                employeeManager = ma.name;
            }
        }
    }
    if (currentEmployee.Reports.length > 0) {
        haveReports = true;
        console.log(haveReports);
        for (let r of currentEmployee.Reports) {
            for (let e of employees) {
                if (r === e.employee_id) {
                    console.log(e.name);
                    reportsDiv += e.name + " ";
                    continue;
                }
            }
        }
    }

    useEffect(()=>{
        getEmployee()
    },[])

    return (
        <>
        
        <div style={detailsDiv}>
        <div style={propertyStyle}>Employee Name: <span style={valueStyle}>{employee.name}</span></div>
        <div style={propertyStyle}>Location: <span style={valueStyle}>{employee.location}</span></div>
        <div style={propertyStyle}>Role: <span style={valueStyle}>{employee.role}</span></div>
        <div style={propertyStyle}>Phone Number: <span style={valueStyle}>{employee.phone}</span></div>
        <div>{employee.Salary &&
        <div style={propertyStyle}>Salary: <span style={valueStyle}>${employee.Salary}</span></div>}</div>
        {hasManager && (<div style={propertyStyle}>Reports to: <span style={valueStyle}>{employeeManager}</span></div>)}
        {haveReports && (<div style={propertyStyle}>Direct Reports: <span style={valueStyle}>{reportsDiv}</span></div>)}
        {hasReports && user.Reports.indexOf(employee.employee_id) >= 0 && (
            <div>
                <p>Edit this employee's salary: </p>
                <form onSubmit={handleSubmit}>
                <TextField size="small" sx={{mr:2}} type="number" name="salary" value={salary} onChange={(e)=>setSalary(e.target.value)}></TextField>
                <Button sx={styles1} type="submit">Update Salary</Button>
                </form>
            </div>
        )}
        </div>
        
        
        
        </>
    )
}

export default EmployeeDetail