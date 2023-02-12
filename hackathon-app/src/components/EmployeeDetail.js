import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import TextField from'@mui/material/TextField'
import {useNavigate} from 'react-router-dom'


const detailsDiv = {
    width: 'fit-content',
    margin: '0 auto 20px', 
    paddingLeft: '25px',
    paddingRight: '25px',
    marginTop: '30px'
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
    backgroundColor: "white",
    color: "#e01719",
    border: "3px solid #e01719",
    //border: "3px solid black",
    marginBottom: "13px",
    fontWeight: 'bold',
    '&:hover': {
      
      color: "white",
      backgroundColor: "#e01719",
      fontWeight: 'bold',
      // boxShadow: 20
    }
  } 

  const reportStyle = {
    fontStyle: 'italic',
    fontSize: '12pt',
    marginBottom: '7px', 
    paddingTop: '15px',
    textDecoration: 'underline'
  }

  const editSalary = {
    paddingTop: '7px'
  }


function EmployeeDetail(){

    const navigate = useNavigate();

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
    let reportsArr = []
    let currentEmployee = JSON.parse(localStorage.getItem("current") ||'{}')
    const managers = JSON.parse(localStorage.getItem('managers')||'[]')
    const employees = JSON.parse(localStorage.getItem('employeesList')||'[]')
    if (employee.Manager?.length > 0) {
        hasManager = true;
        for (let ma of managers) {
            if (ma.employee_id === currentEmployee.Manager[0]) {
                employeeManager = ma.name;
            }
        }
    }
    if (currentEmployee.Reports?.length > 0) {
        haveReports = true;
        for (let r of currentEmployee.Reports) {
            for (let e of employees) {
                if (r === e.employee_id) {
                   // console.log(e.name);
                    reportsDiv += e.name + " ";
                    reportsArr.push(e)
                
                    continue;
                }
               
            }
        }
        console.log(reportsArr)
    }

    function handleClick(id) {
        console.log(id)
       navigate(`/employee/${id}`)
       
      }

      function handleBack(){
        navigate('/profile')
      }

    useEffect(()=>{
        getEmployee()
    },[id])

    return (
        <>

        <div style={{ marginTop: '25px', marginLeft: '25px'}}>
        <Button sx={styles1} onClick={handleBack} type="submit">Back to Search</Button>
        </div>
        <div style={detailsDiv}>
        <div style={propertyStyle}>Employee Name: <span style={valueStyle}>{employee.name}</span></div>
        <div style={propertyStyle}>Location: <span style={valueStyle}>{employee.location}</span></div>
        <div style={propertyStyle}>rRole: <span style={valueStyle}>{employee.role}</span></div>
        <div style={propertyStyle}>Phone Number: <span style={valueStyle}>{employee.phone}</span></div>
        <div>{employee.Salary &&
        <div style={propertyStyle}>Salary: <span style={valueStyle}>${employee?.Salary.toLocaleString("en-US")}</span></div>}</div>
        {hasManager && (<div style={propertyStyle}>Reports To: <span style={valueStyle}>{employeeManager}</span></div>)}
       
        {hasReports && user.Reports.indexOf(employee.employee_id) >= 0 && (
            <div style={editSalary}>
                <p>Edit this employee's salary: </p>
                <form onSubmit={handleSubmit}>
                <TextField size="small" sx={{mr:2}} type="number" name="salary" value={salary} onChange={(e)=>setSalary(e.target.value)}></TextField>
                <Button sx={styles1} type="submit">Update Salary</Button>
                </form>
            </div>
            
        )}
        {hasReports && reportsArr[0] != null && <div style={reportStyle}>Direct Reports: </div>}
        {hasReports && reportsArr.map((report)=>
        <div onClick={(e)=> handleClick(report.employee_id)} className="hoverMeReports"  >{report.name}</div>)}
        
        </div>
        
        
        </>
    )
}

export default EmployeeDetail