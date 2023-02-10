

function Header() {

    const headerDiv = {
        height: '100px',
        backgroundColor: '#e01719',
        color: 'white',
       // fontStyle: 'freightSans'
    }

    const headerText = {
        marginLeft: '25px', 
        paddingTop: '25px',
        display: 'flex',
    }


    return(
        <div style={headerDiv}>
            <div></div>
        <h1 style={headerText}>Enterprise Directory</h1>
        <div></div>
        </div>
    )

}

export default Header