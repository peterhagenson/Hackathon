import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

function EmployeeDetail(){

    let id = useParams();
    //console.log(id)
    let [salary, setSalary] = useState(0);
    let [employee, setEmployee] = useState({})
    let [canEdit, setCanEdit] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
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
        //console.log(salary)
        updateEmployee(salary);
        getEmployee();
    }

    async function getEmployee(){
        await fetch(`http://localhost:5000/employees/${id.id}?role=${user.role}${reportString}${managerString}`, {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true
             
         })
         .then((response) => response.json())
         .then((employee) => {
             setEmployee(employee)
    })}

    async function updateEmployee(psalary) {
        console.log(psalary);
        await fetch(`http://localhost:5000/employees/update/${id.id}?salary=${psalary}`, {
             method: 'PUT',    
         withCredentials: true,    
             crossorigin: true         
         })
    }

useEffect(()=>{
    getEmployee()
},[])

    return (
        <>
        <h3>{employee.name}</h3>
        <p>Location: {employee.location}</p>
        <p>Role: {employee.role}</p>
        <p>Phone Number: {employee.phone}</p>
        
        {hasReports && user.Reports.indexOf(employee.employee_id) >= 0 && (
            <div>
                <p>Salary: ${employee.Salary}</p>
                <br />
                <p>Edit this employee's salary: </p>
                <form onSubmit={handleSubmit}>
                <input type="number" name="salary" value={salary} onChange={(e)=>setSalary(e.target.value)}></input>
                <button type="submit">Update Salary</button>
                </form>
            </div>
        )}
        
        </>
    )
}

export default EmployeeDetail