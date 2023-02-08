import {useState} from 'react'

function Login(){

    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let [user, setUser] = useState('')

function handleSubmit(event) {
    event.preventDefault();
    console.log(userName, password)
}

let fetchBody = {
    userName: userName,
    password: password, 
}

async function getUser(){
    await fetch('http://localhost:5000/people', {
         method: 'GET',    
     withCredentials: true,    
         crossorigin: true,
         body: fetchBody

     })
     .then((response) => response.json())
     .then((u) => {
         console.log(u)
         setUser(u)
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