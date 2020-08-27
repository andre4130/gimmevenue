import React, {useReducer} from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';

//import alert actions
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index'

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //funciones

    const showAlert = (msg, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                category
            }
        });

        //after 5 seconds the alert disappears
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    } 

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >{props.children}
        </alertContext.Provider>
    )
}

export default AlertState;