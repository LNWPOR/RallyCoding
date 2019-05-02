import React from 'react';
import { mount } from 'enzyme';

import Root from 'Root';
import CommentList from 'components/CommentList';

let wrapped
beforeEach(() => {
    const initialState = {
        comments: ['Comment 1', 'Comment 2']
    };

    wrapped = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>  
    ); 
});

it('creates one LI per comment', () => {
    expect(wrapped.find('li').length).toEqual(2);
});

it('shows the text for each comment', () => {
    /*
        enzyme ไม่แนะนำให้ใช้ wrapped.text() ตรงๆ เพราะ ???
        แต่แนะนำให้ใช้ .text() จาก cheerio queries ( คล้ายๆ jquery )
        ซึ่งมะเป็นการใช้ selector ไปเรียก elementๆ นั้นๆมา
        โดย .render() จะคืน cheerio wrapper มาให้เรา
        ซึ่งมี .text() method อีกอันนึงอยู่ ถ้าเราใช้ .text() อันนี้แบบไม่ใส่ค่า argument
        มันจะคืนข้อความใน element นั้น ออกมาให้
    */
    expect(wrapped.render().text()).toContain('Comment 1');
    expect(wrapped.render().text()).toContain('Comment 2');
});