import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";

//context
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/authentication/authContext';

const Register = (props) => {

    //extract values from alertcontext 

    const alertContext = useContext(AlertContext)
    const {alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { msg, authentication, registerUser } = authContext;
    
    //in case of correct authentication of the user, signing in or duplicated user registration 

    useEffect(() => {

        if(authentication) {
            props.history.push('/')
            return;
        };
        if(msg) {
            showAlert(msg.msg, msg.category)
            console.log(msg.msg, msg.category)
        }
    }, [msg, authentication, props.history]);


    //state for login

    const [user, setUser] = useState({
        username:"",
        email: "",
        password: "",
        password2: ""
    });

    const { username, email, password, password2 } = user;

    const onChange = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // User starts session 

    const onSubmit = e => {
        e.preventDefault();

        //Validation

        if (username.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            password2.trim() === ''
        ) {
            showAlert('All fields are mandatory', 'alert-error')
            return;
        }

        //Minimum password 6 characters 
        if (password.length < 6) {
            showAlert("Password must be at least 6 characters", 'alert-error')
            return;
        }

        //Password matching 
        if (password !== password2) {
            showAlert("Password and Password confirmation do not match", 'alert-error')
            return;
        }
        //register
        registerUser({
            username,
            email,
            password
        })
    }
    return (
        <div className="form-user">
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                <div className="campo-form">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Your Username"
                            value={username}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            placeholder="Repeat your Password"
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                            value="Register" />
                    </div>
                </form>
                <Link to={'/login'} className="enlace-cuenta">Login</Link>
                <br/>
                <Link to={'/'} className="enlace-cuenta">Back to Map</Link>
            </div>
        </div>
    );
}

export default Register;