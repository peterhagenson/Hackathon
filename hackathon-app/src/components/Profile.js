//import Search from './Search.js'


function Profile(){
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return (
        <>
        <h3>Welcome to your profile, {user.name}!</h3>
        <p>Employee Name: {user.name}</p>
        <p>Location: {user.location}</p>
        <p>Role: {user.role}</p>
        <p>Phone Number: {user.phone}</p>
        <p>Salary: ${user.Salary}</p>
        </>

    )
}

export default Profile