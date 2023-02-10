import { borderBottom } from '@mui/system';
import Search from './Search.js'

const lastProfileElement = {
  paddingBottom: '10px',
  //borderRight: 'solid'
}

const headingDiv = {
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: '25px',
  paddingTop: '35px',
  paddingRight: '25px',
  color: '#46494d'
}

const detailsDiv = {
  width: 'fit-content',
  margin: '0 auto 20px',
  paddingLeft: '25px',
  paddingRight: '25px',
  color: '#46494d'
}

const propertyStyle = {
  fontStyle: 'italic',
  fontSize: '12pt',
  marginBottom: '7px'
}

const valueStyle = {
  fontStyle: 'normal',
  fontSize: '14pt'

}
const flexThat = {
  display: 'flex',
  
}

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user);
  return (
    <>
    <div style={flexThat}>
      <div style={{width:'25%', borderRight: 'solid', borderWidth: 'thin', borderColor: '#46494d', height: '100vh'}}>
        <div style={headingDiv}>
          <h3>Welcome to your profile, {user.name}!</h3>
        </div>
        <div style={detailsDiv}>
          <div style={propertyStyle}>Employee Name: <span style={valueStyle}>{user.name}</span></div>
          <div style={propertyStyle}>Location: <span style={valueStyle}>{user.location}</span></div>
          <div style={propertyStyle}>Role: <span style={valueStyle}>{user.role}</span></div>
          <div style={propertyStyle}>Phone Number: <span style={valueStyle}>{user.phone}</span></div>
          <div style={propertyStyle}>Salary: <span style={valueStyle}>${user.Salary}</span></div>
        </div>
        <div style={lastProfileElement}></div>
      </div>
      <div style={{width:'75%', height: '100vh'}}>
        <Search />
      </div>
      </div>
    </>

  )
}

export default Profile