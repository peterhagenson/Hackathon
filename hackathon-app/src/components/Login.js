import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from'@mui/material/TextField'

const styles1 = {
    backgroundColor: "black",
    color: "white",
    border: "3px solid black",
    marginBottom: "13px",
    '&:hover': {
      border: "3px solid black",
      color: "black",
      backgroundColor: "white",
      fontWeight: 'bold',
      // boxShadow: 20
    }
  }

  const header = {
    display: 'flex',
    justifyContent: 'center'
  }

  const cardStyle = {
    borderStyle: 'solid',
    borderWidth: 'thin',
    width: '200px',
    borderRadius: '7px',
    margin: '0 auto 20px', 
    paddingLeft: '25px',
    paddingRight: '25px'
}

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
        <h2 style={header}>Welcome to the Enterprise Directory!</h2>
        <div style={cardStyle}>
        <h4>Please log in to continue</h4>
        <form onSubmit={handleSubmit}>
            <label>Username:
                <br></br>
            <TextField size="small" sx={{mb:2}} type="text" name="username" value={userName} onChange={(e)=>setUserName(e.target.value)}></TextField>
            </label>
            <br></br>
            <label>Password:
                <br></br>
            <TextField size="small" sx={{mb:2}} type="text" name="password" value={password}onChange={(e)=>setPassword(e.target.value)} ></TextField>
            </label>
            <br></br>
            <Button sx={styles1} type="submit">Login</Button>
        </form>
        </div>
        </>
    )
}



export default Login