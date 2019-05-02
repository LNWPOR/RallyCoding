import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
// BrowserRouter ตัดสินใจว่าจะทำอะไร พอได้รับ url
// Route = ตัว config route เช่น ถ้า url นี้ ดังนั้นโชว์ component นี้บลาๆ
// Switch เอามาใช้ช่วยการเช็ค path ของ route
// เนื่องจาก Route path="/" มันจะเช็คโดยการดู URL ว่ามี '/' หรือเปล่า ถ้ามีก็โชว์ component นั้นๆ
// ทำให้ ถ้า path="/post/1" บลาๆ component ของ path="/" ก็จะไปโผล่ด้วย
// ดังนั้น ถ้าใช้ Switch มันจะ render เฉพาะ component แรกที่ match path นั้น
import promise from 'redux-promise';

// import App from './components/app'; // ไม่ต้องใช้แล้ว เนื่องจากไม่มีการใช้ component ใด component หนึ่งเป็น center component หลักแล้ว
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/post_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        {/*switch render เฉพาะ component แรกที่ match path นั้น*/}
        {/*ดังนั้น ควรเอา path ที่ specific กว่าไว้บน*/}
        <Switch>
          {/* component ที่ถูก route นี้ใช้ ตอน render จะได้รับ helper function จาก react-router ไปด้วย ไว้ใช้สำหรับการ navigation*/}
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          {/* ระวังถ้า /posts/:id อยู่บนสุด แล้ว postsnew อยู่รองลงมา จะทำให้ถูกมองเป็นว่า ไปหน้า 'posts/new' ถึงแม้ว่าจะใส่ id ไปเช่น posts/123*/}
          {/* *** ต้องเอา specific กว่าไว้บนเสมอ *** */}
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));


// class Hello extends React.Component{
//   render(){return <div>Hello!</div>}
// }
// class Goodbye extends React.Component{
//   render(){return <div>Goodbye!</div>}
// }

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <BrowserRouter>
//       <div>
//         Header
//         {/* ไม่ใช่การแก้ไข htmldocument แต่เป็นการ hide and show different set of component */}
//         <Route path="/hello" component={Hello} /> {/*ถ้ามา path นี้ดังนั้น โชว์ component นี้*/}
//         <Route path="/goodbye" component={Goodbye} /> {/*ชื่อ path กับ component ไม่ต้องเหมือนกันก็ได้เ*/}
//       </div>
//     </BrowserRouter>
//   </Provider>
//   , document.querySelector('.container'));
