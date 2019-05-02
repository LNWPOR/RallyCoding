// ถ้าไม่ใส่เป็น relative path ./ webpack รู้เองว่าต้องไปดูที่ node_modules
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers , {}, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

// Create React app สามารถสร้างไฟล์ .env.development, .env.production เพื่อกำหนดค่าตัวแปลต่างๆให้เรียกใช้ได้
// ดังนั้นเราจึงใช้เป็นที่เก็บ publishablekey ของ stripe สำหรับ front-end ได้ โดยเราจะไม่ commit ไฟล์ . ดังกล่าว
// แต่จริงๆแล้วตอน bundle มันก็จะเอาไฟล์นี้ไปรวมด้วยอยู่ดีทำให้ key เราก็ติดไปด้วยอยู๋ดี ส่งถึงฝั่ง user อยู่ดี แปลว่าจริงๆวิธีนี้ก็ไม่ได้ secret จริงๆ
// console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY)
// แต่คนสอนบอกว่าตอน build มันจะไม่ได้ค่าคงที่ที่ตั้งไว้ติดไปด้วย
// งงสรุปได้หรือไม่ได้ตอน build