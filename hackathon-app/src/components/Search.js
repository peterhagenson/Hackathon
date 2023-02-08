import {useEffect, useState} from 'react'


function Search(){

    let [employees, setEmployees] = useState([])
    let [searchTerm, setSearchTerm] = useState('')
    let [filteredEmployees, setFilteredEmployees] = useState([])
 
    //probably need to change line 13
    function filterEmployees(arr, query) {
        console.log(arr)
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
             console.log(e)
             setEmployees(e)
         })
     }

     function handleClick(employee) {
            console.log(employee)
     }
    

    useEffect(() => {
        getEmployees()
        filterEmployees(employees, searchTerm)
    },[searchTerm])

    if(filteredEmployees[0]) {

        return (
           <>
             <h1>Welcome to the Enterprise Directory!</h1>
             <h3>Who are you looking for?</h3>
             <form >
               <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
             </form>
             
             {filteredEmployees.map((employee)=>
             <p>{employee?.name}</p>)}
             </>)} else {
     return(
       <>
       <h1>Welcome to the Enterprise Directory!</h1>
             <h3>Who are you looking for?</h3>
             <form >
               <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
             </form>
     {employees.map((employee) =>
       <p onClick={()=>handleClick(employee)}>{employee?.name}</p>)}
     
       </>
             
             
     
         )
     }}


export default Search