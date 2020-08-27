import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom"

//context
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/authentication/authContext';


const Login = (props) => {
    //extract values from alertcontext 

    const alertContext = useContext(AlertContext)
    const {alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { msg, authentication, login } = authContext;   

    //in case user does not exist or the password it is incorrect
    useEffect(() => {
        if(authentication) {
            props.history.push('/')
            return;
        };
        if(msg) {
           showAlert(msg.msg, 'alert-error')

        }
    }, [msg, authentication, props.history]);

    //state for login

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = user;

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
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are mandatory', 'alert-error')
        }
        //Login
        login({email, password});
    }
    return (
        <div className="form-user">
             {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
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
                        <input type="submit" className="btn btn-primario btn-block"
                            value="Login" />
                    </div>
                </form>
                <Link to={'/register'} className="enlace-cuenta">Register</Link>
                <br/>
                <Link to={'/'} className="enlace-cuenta">Back to Map</Link>

            </div>
        </div>
    );
}

export default Login;