import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

//import alert actions
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types/index';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';


const AuthState = props => {
    const initialState ={
        token: localStorage.getItem('token'),
        authentication: null,
        user: null,
        msg: null
    } 

    const [ state, dispatch] = useReducer(AuthReducer, initialState);

    //Functions

    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data
            });
            //if authentication is succesful, get the user using the function 
            authUser();
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            })
        }
    }

    //Return authenticated user

    const authUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
           tokenAuth(token);
        }
        try {
            const response = await clientAxios.get('/api/auth')
            console.log(response)
            dispatch({
                type: OBTENER_USUARIO,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
            
        }
    }

    //login function

    const login = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data 
            });

            //if login is correct, it will be redirected to the main page logged in 
            authUser();
        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    //Logout function 

    const logout = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
        value={{
            token: state.token,
            authentication: state.authentication,
            user: state.user,
            msg: state.msg,
            registerUser,
            login,
            authUser,
            logout
        }}
    >{props.children}</AuthContext.Provider>
    )
}

export default AuthState;