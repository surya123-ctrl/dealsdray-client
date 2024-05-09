import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
const Navbar = () => {
    return (
        <div className='navbar-container'>
            <ul className='navbar-list'>
                <Link to="/" className="navbar-link"><li className="navbar-item">Home</li></Link>
                <Link to="/employee-details" className="navbar-link"><li className="navbar-item">Employee Details</li></Link>
                <Link to="/register" className="navbar-link"><li className="navbar-item">Create Employee</li></Link>
                <Link to="/logout" className="navbar-link"><li className="navbar-item">Logout</li></Link>
            </ul>
        </div>
    )
}

export default Navbar
