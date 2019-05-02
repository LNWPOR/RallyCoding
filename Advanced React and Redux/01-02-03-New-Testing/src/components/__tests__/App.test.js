import React from 'react';
import { shallow } from 'enzyme';
// ใช้ absolute path ได้เนื่องจากกำหนดไว้ที่ .env
import App from 'components/App';// ใช้ path จาก absolute ไฟล์ test จะได้ดูเปนระเบียบและย้ายไปย้ายมาได้ จะได้ไม่ต้องกังวล relative path
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;
beforeEach(()=>{ // run before only on each it in this test file not all test file
    wrapped = shallow(<App />);
});

it('shows a comment box', () => {
    // const wrapped = shallow(<App />);
    expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
    // const wrapped = shallow(<App />);
    expect(wrapped.find(CommentList).length).toEqual(1);
});


// เนื่องจากใช้ enzyme ดังนั้นไม่ต้องทำท่า div หลอก jest แล้ว
// import ReactDOM from 'react-dom';
// it('shows a comment box', () => {
//     const div = document.createElement('div'); // fake div สำหรับใช้หลอก jest ให้เข้าใจว่าใช้บน browser อยู่
    
//     ReactDOM.render(<App />, div);

//     // Looks inside the div
//     // and checks to see if the CommentBox is in there
//     // expect(div.innerHTML).toContain('Comment Box'); // ไม่ควรเช็คถึงข้อมูลใน component มันลึกไป ละต้องมาแก้ข้อมูล test ให้ตรงอีกตายห่า
//     // expect(div).toHaveAnInstanceOf(CommentBox);// เราจะไม่ใช้ท่านี้ลำบากไป เราจะใช้ enzyme มาช่วย ซึ่งเป็นตัวช่วยในการ test react component


//     ReactDOM.unmountComponentAtNode(div); // cleanup ลบทิ้งหลังจากเลิกใช้ จะได้ไม่เปลือง memory
// });