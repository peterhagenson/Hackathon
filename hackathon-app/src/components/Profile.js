import { borderBottom } from '@mui/system';
import Search from './Search.js'

const lastProfileElement = {
    paddingBottom: '10px',
    borderBottom: 'solid'
}

const headingDiv = {
    display: 'flex',
    justifyContent: 'center'
  }
  

function Profile(){
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    return (
        <>
        <div style={headingDiv}>
        <h3>Welcome to your profile, {user.name}!</h3>
        </div>
       
        <div>Employee Name: {user.name}</div>
        
        <div>Location: {user.location}</div>
        <div>Role: {user.role}</div>
        <div>Phone Number: {user.phone}</div>
        <div style={lastProfileElement}>Salary: ${user.Salary}</div>
        
        <Search />
        </>

    )
}

export default Profile