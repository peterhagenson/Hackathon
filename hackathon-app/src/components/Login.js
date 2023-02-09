import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


function Login(){

    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    //let [user, setUser] = useState('')
    let navigate = useNavigate();

function handleSubmit(event) {
    event.preventDefault();
    console.log(userName, password)
    getUser();
}


async function getUser(){
    await fetch(`http://localhost:5000/employees/login/${userName}/${password}`, {
         method: 'GET',    
     withCredentials: true,    
         crossorigin: true,
     })
     .then((response) => response.json())
     .then((u) => {
         console.log(u)
         //setUser(u)
         if(Object.keys(u).length > 0) {
            localStorage.setItem("user", JSON.stringify(u));
            navigate('/profile');
         } 
         // else show error msg
         
     })
 }
    return ( 
        <>
        <p>Welcome to the Login Page</p>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
            <input type="text" name="password" value={password}onChange={(e)=>setPassword(e.target.value)} ></input>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login