import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(()=>{
    moxios.install();
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments',{ // url ที่ต้องการให้ moxios ดัก axios ไว้ถ้าจะยิงมาที่นี่, mock resposne
        status:200,
        response:[{name: 'Fetched #1'}, {name: 'Fetched #2'}]
    });
});

afterEach(()=>{
    moxios.uninstall();
})

// ต้องใช้ done เนื่องจาก ถ้าไม่มี done ดังนั้น test มันก้จะรันตั้งแต่ต้นจนจบละถือว่าเสร้จ test นั้นๆ
// แต่ถ้ามี done มันจะไม่ถือว่า test case นั้นๆจบ จนกว่า done จะถูกเรียก
// ดังนั้นเราจึงเอา done มาใช้ช่วย เพราะเราต้องการใช้ settimeout
// เพื่อให้มันถือว่าเสร็จหลังจาก settimeout เสร้จ ไม่งั้นมันก้ข้ามไปเลย
// ใช้ moxios.wait แทน settimeout ก้ได้
it('can fetch a list of comments and display them', (done) => {
    //Attempt to render the *entire* app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    )

    // find the 'fetchComments' button and click it
    wrapped.find('.fetch-comments').simulate('click');

    // introduce a TINY little pause เพื่อรอให้ moxios ทำงานคืน fake response เสร็จก่อน
    moxios.wait(()=>{
        wrapped.update();
        expect(wrapped.find('li').length).toEqual(2);
        done();
        wrapped.unmount();
    });
    // setTimeout(()=>{
    //     wrapped.update();
    //     expect(wrapped.find('li').length).toEqual(2);
    //     done();
    //     wrapped.unmount();
    // },100);
});