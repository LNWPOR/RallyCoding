import React from 'react';
import { mount } from 'enzyme'; // เอา mount มาเพื่อใช้ test แบบ Full DOM
import CommentBox from 'components/CommentBox';
import Root from 'Root';
let wrapped;
beforeEach(()=>{
    wrapped = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

afterEach(()=>{
    wrapped.unmount();
});

it('has a text area and two button', () => {
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', ()=>{
    beforeEach(() => {
        wrapped.find('textarea').simulate('change',{
            target:{ value : 'new comment' }
        });
        wrapped.update();// เนื่องจาก เราใช้ setState ในการเปลี่ยนค่า ดังนั้นค่ามันจะไม่เปลี่ยนให้ทันทีต้องรอ cycle react rerender ก่อน ดังนั้นเราใช้คำสั่งนี้สั่งให้มัน update rerender ให้เลยทันที
    });
    it('has a text area that users can type in', () => {
        
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    });
    it('when form is submitted, text area gets emptied', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    });
})