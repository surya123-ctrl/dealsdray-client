import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { AuthContext } from '../../contexts/AuthContext'
const Navbar = () => {
    let loggedInDetails = useContext(AuthContext);
    const handleLogout = async () => {
        localStorage.removeItem('token');
        loggedInDetails.setIsLoggedIn(undefined);
    };
    return (
        <div className='navbar-container'>
            <ul className='navbar-list'>
                <Link to="/" className="navbar-link"><li className="navbar-item">Home</li></Link>
                <Link to="/employee-details" className="navbar-link"><li className="navbar-item">Employee Details</li></Link>
                <Link to="/register" className="navbar-link"><li className="navbar-item">Create Employee</li></Link>
                {/* {!loggedInDetails?.isLoggedIn ? <Link to="/login" className="navbar-link"><li className="navbar-item">Login</li></Link> : (<button onClick={logout}>Logout</button>)} */}

                {loggedInDetails?.isLoggedIn !== undefined ? (
                    <>
                        <li className="navbar-item">
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <Link className="navbar-item" to="/login">
                        <button>Login</button>
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default Navbar
