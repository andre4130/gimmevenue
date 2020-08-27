//import alert actions
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index'

export default (state, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                alert: action.payload,
            }
        case OCULTAR_ALERTA:
            return {
            alert: null
        }
        default:
            return state;
    }
};