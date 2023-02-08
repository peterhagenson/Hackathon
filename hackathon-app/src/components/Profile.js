
function Profile(){
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return (
        <p>Welcome to the Profile Page</p>
    )
}

export default Profile