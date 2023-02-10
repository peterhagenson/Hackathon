import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from'@mui/material/TextField' 
import './Search.css'

const resultsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  marginLeft: '100px',
  marginRight: '100px'
  
}

const personContainer = {
  width: '150px',
  marginBottom: '30px', 
  color: '#46494d'
 
}



const cardName = {
  fontWeight: 'bold',

  }

  const cardText = {
    textAlign: 'center'
  }


const searchHeadingDiv = {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '35px',
  color: '#46494d'
  
}

const searchFieldDiv = {
  display: 'flex',
  justifyContent: 'center',
  
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
             e.sort((a, b) => {
              return a.name.localeCompare(b.name);
             })
             localStorage.setItem("employeesList", JSON.stringify(e))
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
             <div style={searchFieldDiv}>
             <form >
               <TextField size="small" sx={{mb:4, mt:1}} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></TextField>
             </form>
             </div>
             
             <div style={resultsContainer}>
             {filteredEmployees.map((employee)=>
             
             <div style={personContainer} onClick={()=>handleClick(employee)} >
<div className="hoverMe">{employee?.name}</div>
<div style={cardText}>{employee?.location}</div>
<div style={cardText}>{employee?.role}</div>
             </div>
             
             )}
             </div>
             </>)} else {
     return(
       <>
       
       <div style={searchHeadingDiv}>
             <h3>Search the Enterprise Directory:</h3>
             </div>
             <div style={searchFieldDiv}>
             <form >
               <TextField size="small" sx={{mb:4, mt:1}} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ></TextField>
             </form>
             </div>
             <div style={resultsContainer}>
     {employees.map((employee) =>
      <div style={personContainer} onClick={()=>handleClick(employee)} >
       <div className="hoverMe">{employee?.name}</div>
<div style={cardText}>{employee?.location}</div>
<div style={cardText}>{employee?.role}</div>
       </div>
       )}
     </div>
       </>
             
             
     
         )
     }}


export default Search