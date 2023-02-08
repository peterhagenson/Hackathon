import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

function EmployeeDetail(){

    let id = useParams();
    console.log(id)

    let [employee, setEmployee] = useState({})

   

    async function getEmployee(){
        await fetch(`http://localhost:5000/employees/${id.id}`, {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true,
         })
         .then((response) => response.json())
         .then((employee) => {
             console.log(employee)
             setEmployee(employee)
    })}

useEffect(()=>{
    getEmployee()
},[])

    return (
        <>
        <p>Welcome to the Employee Detail Page</p>
        {JSON.stringify(employee)}
        </>
    )
}

export default EmployeeDetail