import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch(action.type){
        case FETCH_USER:
            return action.payload || false; // เนื่องจากตอน logout action.payload จะ= "" ดังนั้นเราจึงใช้ถ้า || false ช่วยดัก เนื่องจาก ''||false จะ= false
        default:
            return state;
    }
}