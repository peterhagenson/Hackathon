import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from'@mui/material/TextField'

const resultsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly'
  
}

const personContainer = {
  width: '150px',
  marginBottom: '15px'
  
}

const cardName = {
  fontWeight: 'bold'
}

const searchHeadingDiv = {
  display: 'flex',
  justifyContent: 'center'
}


function Search(){

    let [employees, setEmployees] = useState([])
    let [searchTerm, setSearchTerm] = useState('')
    let [filteredEmployees, setFilteredEmployees] = useState([])

    const navigate = useNavigate();
 
    //probably need to change line 13
    function filterEmployees(arr, query) {
        //console.log(arr)
        let results = arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredEmployees(results)
      }
  

    async function getEmployees(){
        await fetch('http://localhost:5000/employees', {
             method: 'GET',    
         withCredentials: true,    
             crossorigin: true
         })
         .then((response) => response.json())
         .then((e) => {
             //console.log(e)
             setEmployees(e)
         })
     }

     function handleClick(employee) {
            console.log(employee)
            navigate(`/employee/${employee.employee_id}`)
     }
    

    useEffect(() => {
        getEmployees()
        filterEmployees(employees, searchTerm)
    },[searchTerm])

    if(filteredEmployees[0]) {

        return (
           <>
           <div style={searchHeadingDiv}>
             <h3>Search the Enterprise Directory:</h3> 
             </div>
             <div style={searchHeadingDiv}>
             <form >
               <TextField size="small" sx={{mb:2}} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></TextField>
             </form>
             </div>
             
             <div style={resultsContainer}>
             {filteredEmployees.map((employee)=>
             
             <div style={personContainer} onClick={()=>handleClick(employee)} >
<div style={cardName}>{employee?.name}</div>
<div>{employee?.location}</div>
<div>{employee?.role}</div>
             </div>
             
             )}
             </div>
             </>)} else {
     return(
       <>
       
       <div style={searchHeadingDiv}>
             <h3>Search the Enterprise Directory:</h3>
             </div>
             <div style={searchHeadingDiv}>
             <form >
               <TextField size="small" sx={{mb:2}} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ></TextField>
             </form>
             </div>
             <div style={resultsContainer}>
     {employees.map((employee) =>
      <div style={personContainer} onClick={()=>handleClick(employee)} >
       <div style={cardName}>{employee?.name}</div>
<div>{employee?.location}</div>
<div>{employee?.role}</div>
       </div>
       )}
     </div>
       </>
             
             
     
         )
     }}


export default Search