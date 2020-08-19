import React, { useState } from 'react';
import { Link } from "react-router-dom"


const Register = () => {

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

        //Minimum password 6 characters 

        //Password matching 

        //register
    }
    return (
        <div className="form-user">
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
            </div>
        </div>
    );
}

export default Register;