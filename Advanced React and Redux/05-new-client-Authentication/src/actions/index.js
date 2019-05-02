import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

// export const signup = formProps => dispatch=> {
export const signup = (formProps, callback) => async dispatch=> {
  try{
    const response = await axios.post('http://localhost:3090/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback();
  }catch(e){
    dispatch({ type: AUTH_ERROR, payload: 'Email in use'});
  }
      // redux thunk we can call dispatch many action many time as we want with this approah
    // ถ้าเป็น redux promise ก็ยังยิงได้ทีเดียวอยู่ดี
    // dispatch({ type: AUTH_USER });
    // dispatch({ type: AUTH_USER });
    // dispatch({ type: AUTH_USER });
    // dispatch({ type: AUTH_USER });

  // return {
  //   type: auth_user,
  //   payload: '0100101'
  // }


};
  
export const signout = () =>{
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const signin = (formProps, callback) => async dispatch=> {
  try{
    const response = await axios.post('http://localhost:3090/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback();
  }catch(e){
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials'});
  }

};