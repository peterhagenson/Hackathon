import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from'@mui/material/TextField'

const styles1 = {
    backgroundColor: "white",
    color: "#e01719",
    border: "3px solid #e01719",
    //border: "3px solid black",
    marginBottom: "13px",
    fontWeight: 'bold',
    '&:hover': {
      
      color: "white",
      backgroundColor: "#e01719",
      fontWeight: 'bold',
      // boxShadow: 20
    }
  }  

  const loginMessage = {
    paddingTop: "13px"
  }

  const background = {
    backgroundColor: '#f6f6f6',
    height: '100vh'
  }

  const header = {
    display: 'flex',
    justifyContent: 'center',
    color: '#46494d',
    paddingTop: "50px"
  }

  const btnDiv = {
    display: 'flex',
    justifyContent: 'center',
    color: '#46494d',
  }

  const cardStyle = {
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderColor: "#46494d",
    width: '200px',
    borderRadius: '7px',
    margin: '0 auto 20px', 
    paddingLeft: '25px',
    paddingRight: '25px',
    backgroundColor: 'white',
    color:'#46494d'
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
        <div style={background}>
        <h2 style={header}>Welcome to the Enterprise Directory!</h2>
        <div style={cardStyle}>
        <h4 style={loginMessage}>Please log in to continue</h4>
        <form onSubmit={handleSubmit}>
            <label>Username:
                <br></br>
            <TextField autoComplete="off" size="small" sx={{mb:2}} type="text" name="username" value={userName} onChange={(e)=>setUserName(e.target.value)}></TextField>
            </label>
            <br></br>
            <label>Password:
                <br></br>
            <TextField autoComplete="off" size="small" sx={{mb:2}} type="text" name="password" value={password}onChange={(e)=>setPassword(e.target.value)} ></TextField>
            </label>
            <br></br>
            <div style={btnDiv}>
            <Button sx={styles1} type="submit">Login</Button>
            </div>
        </form>
        </div>
        </div>
        </>
    )
}



export default Login