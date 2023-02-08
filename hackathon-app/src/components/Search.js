import {useEffect, useState} from 'react'


function Search(){

    let [employees, setEmployees] = useState([])
    let [searchTerm, setSearchTerm] = useState('')
    let [filteredEmployees, setFilteredEmployees] = useState([])

    function filterEmployees(arr, query) {
        console.log(arr)
        let results = arr.filter((el) => el.fields.name.toLowerCase().includes(query.toLowerCase()));
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
    

    useEffect(() => {
        getEmployees()
        filterEmployees(employees, searchTerm)
    },[searchTerm])

    return (
        <p>Welcome to the Search Page</p>
    )
}

export default Search