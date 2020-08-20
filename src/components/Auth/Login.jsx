import React, { useState } from 'react';
import { Link } from "react-router-dom"


const Login = () => {

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

        //Login
    }
    return (
        <div className="form-user">
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