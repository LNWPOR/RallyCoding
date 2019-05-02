import axios from 'axios';
// axios = lib for making ajax request from browser
// เราไม่อยากใช้ jquery เพราะมันจะพ่วงอย่างอื่นนอกจาก ajax มาด้วย

const API_KEY = '12988adef3988f52d7225b4865faedc1';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

// middleware = function that take an action
// depending on action type,payload and other factor
// middleware จะดูว่าจะให้ action ผ่านไป, ควบคุม action, logs ,stop action, บลาๆ
// ก็คือเหมือนมันจะมาจัดการบางอย่างกับ action ให้ก่อนที่จะไปให้ reducer
// เหมือนเป็นคนเฝ้าประตูก่อนไป reducer = ยามเฝ้าประตู
// เราจะมี middleware หรือไม่มี หรือมีกี่ตัวก็ได้

export const FETCH_WEATHER = 'FETCH_WEATHER'; //ทำเป็นตัวแปลให้ใช้ร่วมกันระหว่าง action creator กับ reducer

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);// return a promise
    
    // console.log('Request:', request);
    return {
        type: FETCH_WEATHER,
        payload: request // return a promise as a payload
        // แต่ว่าถ้าเอาไป log ที่ reducer ด้วยการ console.log(action) จะไม่ได้ค่าเดียวกันทั้งๆที่ควรจะได้ค่าเดียวกัน เพราะเราส่งไปสั่งปริ้น
        // ที่เป็นแบบนั้น เพราะ มันวิ่งผ่าน middleware ก่อน
        // ซึ่งก็คือผ่าน redux-promise ก่อนนั้นเอง
        // โดยยันจะดู payload ก่อน ถ้า payload เป็น promise
        // ดังนั้นมันจะ stop action
        // และ ถ้า request resolve แล้ว จบ promise แล้ว
        // จึงค่อย สร้าง action ใหม่แล้ว dispatch action ไปที่ reducer ต่ออีกที
        // ดังนั้น console.log(action) ที่ reducer จึงได้ response ของ request นี้เลยโดยอัตโนมัติ
        // จะเห็นว่าเพราะใช้ middleware ทำให้ code สวยขึ้นเยอะ ไม่ต้องมาดัก promise ก่อนเอง
    };
}