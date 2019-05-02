import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';

export default function(state = {}, action){
    switch(action.type){
        case DELETE_POST:
            return _.omit(state, action.payload);
            // เข้าไปดูใน state ถ้า state มี key ของ post id ดังนั้น drop อันนั้นทิ้ง
            // แล้ว return เป็น object ใหม้
        case FETCH_POST:
            // ไม่อยากลบ state เก่าที่เก็บมาทิ้ง ดังนั้นเอามาแก้กับของเดิม

            // ES5
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post; // = สร้าง key ใหม่ของ object ด้วย post.id แล้วใส่ค่า postไป ไม่ใช่ทำ array นะ
            // เรียกว่า key interpolation
            // return newState;

            // ES6
            return {...state, [action.payload.data.id] : action.payload.data};
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
            // แปลง array มาเป็น object โดยใช้ field 'id' ของ object ใน array
            // เป็น key ของ object ใหญ่ใหม่
        default:
            return state;
    }
}