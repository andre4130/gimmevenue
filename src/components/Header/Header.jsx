import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import { Link } from 'react-router-dom'

//styled components
import Button from '../../styles/styledComponents/Button'

// components
import Navbar from "../../components/Navbar";

const Header = () => {
    //setting the state of the App
    const authContext = useContext(AuthContext)
    const { user, authUser, logout } = authContext;

    useEffect(() => {
        authUser();
    }, []);

    return (
        <div>
            <header className='app-header'>
                {user ? <p className='nombre-usuario'>Hello <span>{user.username}</span></p> : <p className='nombre-usuario'>Hello <span>you!</span></p>}
                <nav className='nav-principal'>
                    {user ? <Button
                        className="btn btn-blank"
                        onClick={() => logout()}
                    >Logout</Button> : <Button
                        className="btn btn-blank btn-log"
                    ><Link to={"/login"}>Login</Link></Button>}
                    <p></p>
                    {user ? null : <Button
                        className="btn btn-blank btn-log"
                    ><Link to={"/register"}>Register</Link></Button>}
                </nav>
                <Navbar></Navbar>
            </header>
        </div>

    );
};

export default Header;