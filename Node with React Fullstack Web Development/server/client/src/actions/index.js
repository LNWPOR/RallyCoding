import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// เนื่องจากเรามี redux thunk เป็น middleware ดังนั้นมันจะดูทุก action creator ว่าอันไหนเรา return function ไม่ใช่ return action ตรงๆ มันจะ pass dispatch function มาใน argument ให้ใช้อัตโนมัติ
export const fetchUser = () => async dispatch => { // ด้วยพลังของ redux-thunk ทำให้เราสามารถใช้ dispatch ตอนไหนก็ รอให้ promise เสร้จ async ได้ ไม่ใช่เข้าฟังชันปุปละ return action เลยตามปกติ
    const res = await axios.get('/api/current_user') // แก้ proxy ที่ package.json เพื่อให้ dev ใช้ได้ด้วย "api/*" // prod รันได้อยู่แล้วไม่ต้อง proxy
    dispatch({type: FETCH_USER, payload: res.data});
    // dispatch({type: FETCH_USER, payload: await axios.get('/api/current_user')});
};
// export const fetchUser = () => {
//     // เนื่องจากเรามี redux thunk เป็น middleware ดังนั้นมันจะดูทุก action creator ว่าอันไหนเรา return function ไม่ใช่ return action ตรงๆ มันจะ pass dispatch function มาใน argument ให้ใช้อัตโนมัติ
//     return function(dispatch){ // ด้วยพลังของ redux-thunk ทำให้เราสามารถใช้ dispatch ตอนไหนก็ รอให้ promise เสร้จ async ได้ ไม่ใช่เข้าฟังชันปุปละ return action เลยตามปกติ
//         axios
//             .get('/api/current_user') // แก้ proxy ที่ package.json เพื่อให้ dev ใช้ได้ด้วย "api/*" // prod รันได้อยู่แล้วไม่ต้อง proxy
//             .then(res => dispatch({type: FETCH_USER, payload: res}));
//     };
// };

export const handleToken = (token) => async dispatch =>{
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER,payload: res.data});
};

export const submitSurvey = (values,history) => async dispatch =>{
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({type:FETCH_USER,payload:res.data});
};

export const fetchSurveys = () => async dispatch =>{
    const res = await axios.get('/api/surveys');

    dispatch({type: FETCH_SURVEYS, payload:res.data});
};