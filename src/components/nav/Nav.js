import React from 'react'
import "./Nav.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../../features/authSlice';

function Nav() {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = () => {
        // Dispatch de la acción de logout
        dispatch(logout());
    };

    return (
        <nav className='nav-container'>
            <Link to={"/"}><button className="button-15">Home</button></Link>
            <ul className='nav-links'>
                <Link to={"/register"}>
                    <li className='nav-link'>Register</li>
                </Link>
                {isAuthenticated && <Link to={"/profile"}>
                    <li className='nav-link'>Profile</li>
                </Link>}
                {!isAuthenticated && <Link to={"/login"}>
                    <li className='nav-link'><button className="button-8">login</button></li>
                </Link>}
                {isAuthenticated && <button className="button-8" onClick={handleLogout}>Logout</button>}
            </ul>

        </nav>
    )
}

export default Nav