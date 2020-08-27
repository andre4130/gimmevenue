import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import { Link } from 'react-router-dom'

// components
import Navbar from "../../components/Navbar";

const Header = () => {
    //setting the state of the App
    const authContext = useContext(AuthContext)
    const { user, authUser, logout, login } = authContext;

    useEffect(() => {
        authUser();
    }, []);

    return (
        <div>
            <header className='app-header'>
                {user ? <p className='nombre-usuario'>Hello <span>{user.username}</span></p> : <p className='nombre-usuario'>Hello <span>you!</span></p>}
                <nav className='nav-principal'>
                    {user ? <button
                        className="btn btn-blank"
                        onClick={() => logout()}
                    >Logout</button> : <button
                        className="btn btn-blank btn-log"
                    ><Link to={"/login"}>Login</Link></button>}
                    <p></p>
                    {user ? null : <button
                        className="btn btn-blank btn-log"
                    ><Link to={"/register"}>Register</Link></button>}
                </nav>
                <Navbar></Navbar>
            </header>
        </div>

    );
};

export default Header;