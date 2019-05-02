const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name:'Joe',
            posts:[{title:'PostTitle'}]
        });

        joe.save()
            .then(()=> User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.posts[0].title === 'PostTitle');
                done();
            })
    });

    it('Can add Subdocuments to an existing recrod', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(()=> User.findOne({name:'Joe'}))
            .then((user)=>{
                user.posts.push({title: 'New Post'});
                // user.posts = [...user.posts, {title: 'New Post'}]
                return user.save(); // คืน promise ไปจะได้ chain .then อันต่อไปได้
            })
            .then(() => User.findOne({name:'Joe'}))
            .then((user)=>{                
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts:[{title: 'New Title'}]
        });

        joe.save()
            .then(()=> User.findOne({name:'Joe'}))
            .then((user)=>{
                const post = user.posts[0];
                post.remove(); // *** มันยังไม่อัพเดทใน database นะ พึ่งแค่ remove ตัวเองออกจาก parent record 
                return user.save(); // ต้อง save ก่อน ถึงจะอัพเดท
            })
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.posts.length === 0);
                done();
            });
    });
});