import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action){
    // console.log('Action received', action);
    switch(action.type){
        case FETCH_WEATHER:
            // return state.push(action.payload.data);
            // .push = ทำการแก้ ไข array เดิม 
            // ***ผิด ห้าม manipulate state directly***
            // ต้อง *** return new fresh version state เท่านั้น ***
            
            // return state.concat([action.payload.data]); // ใช้ได้
            // เนื่องจาก concat จะ return new Array ดังนั้น = new fresh state
            // ถ้านี้จะเป็นการเอา ของใหม่ไปต่อท้าย array เดิม แต่จริงๆจะสลับก็ได้

            return [ action.payload.data, ...state]; // ใช้ได้
            // = ES6 = สร้าง array ใหม่ เอาก้อนข้างหน้าใส่ 
            // แล้วก็ ไปดู ... ถ้าเป็น array ถ้าเป็น array ดังนั้นจะไปทำการเอา ของแต่ละอันข้างใน ย้ายมาใส่ใน array ใหม่นี้ให้ทั้งหมด
            // return array ใหม่นี้คืนมา = [city,city,ctiy] not [city,[city,city]]
            // แต่ท่านี้คือจะเป็นการเอา ของใหม่ใส่ไว้ที่ top ของ array
        }
    return state;
}