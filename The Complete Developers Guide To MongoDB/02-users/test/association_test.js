const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, commet;
    beforeEach((done)=>{
        joe = new User({name:'Joe'});
        blogPost = new BlogPost({title:'JS is Great', content:'Yep it really is'});
        comment = new Comment({content:'Congrats on great post'});
    
        joe.blogPosts.push(blogPost);// mongoose จะรุ้เองว่า เราจะเอาแค่ ObjectId แม้ว่าเราจะใช้วิธียัด model เข้าไปตรงๆแบบนี้ เพราะเรากำหนด type ไว้แล้วที่ schema
        blogPost.comments.push(comment);
        comment.user = joe; // mongoose รู้เองด้วยเหตุผลเดียวกัน

        // เอา promise หลายๆอันมารอรวมกันในที่เดียว ถ้าทุกอันเสร็จค่อย .then ทำต่อ
        // โดยแต่ละ promise ข้างในจะทำงานไปแบ parallel
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(()=>done());
    });
    // it.only = รันแค่ test นี้ test เดียว ไม่ต้องรัน test อื่น
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name:'Joe'})
            .populate('blogPosts') // ใส่ชื่อให้ถูกตามที่ตั้งไว้
            .then((user)=>{
                // console.log(user);
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    it('saves a full relation tree', (done) => {
        User.findOne({name:'Joe'})
            .populate({
                path:'blogPosts',// path = ชื่อ field ที่เราต้องการ load ไม่ใช่ชื่อ model นะ
                populate:{ // ซ้อน populate ไปอีก
                    path:'comments',
                    model:'comment',// เลือก model ต้องการใช้,
                    populate:{
                        path:'user',
                        model:'user'
                    }
                }
            })
            .then((user)=>{
                // console.log(user);
                // console.log(user.blogPosts[0]);
                // console.log(user.blogPosts[0].comments[0]);

                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');

                done();
            });
    });
});