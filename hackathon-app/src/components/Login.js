import {useState} from 'react'

function Login(){

    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')

function handleSubmit(event) {
    event.preventDefault();
    console.log(userName, password)
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