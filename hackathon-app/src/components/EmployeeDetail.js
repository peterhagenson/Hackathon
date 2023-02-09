import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'


function EmployeeDetail(){

    let id = useParams();
    //console.log(id)

    let [employee, setEmployee] = useState({})
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.role);
    console.log(user.Reports);
    let reportString = "";
    if (user.Reports.length > 0) {
        for (let rep of user.Reports) {
            reportString += `&reports=${rep}`;
        }
    }
    console.log(reportString);
    async function getEmployee(){
        await fetch(`http://localhost:5000/employees/${id.id}?role=${user.role}${reportString}`, {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true
             
         })
         .then((response) => response.json())
         .then((employee) => {
             //console.log(employee)
             setEmployee(employee)
    })}

useEffect(()=>{
    getEmployee()
},[])

    return (
        <>
        <h3>{employee.name}</h3>
        <p>Location: {employee.location}</p>
        <p>Role: {employee.role}</p>
        <p>Phone Number: {employee.phone}</p>
        <p>Salary: ${employee.Salary}</p>
        </>
    )
}

export default EmployeeDetail