import React from 'react'
import {Link} from "react-router-dom"


const HomePage = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/about" >About</Link>
            <br/>
            <Link to="/signup" >Sign Up</Link>
            <br/>
            <Link to="/login" >Log In</Link>
        </div>
    )
}

export default HomePage
