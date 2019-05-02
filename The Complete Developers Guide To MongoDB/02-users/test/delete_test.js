const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;
    beforeEach((done)=>{
        joe = new User({name:'Joe'});
        joe.save()
            .then(()=>done());
    });
    
    // วิธีลบ record นั้นมีหลายวิธี มีหลักๆประมาณ 4 วิธี ซึ่งแบ่งเป็น2 ทางหลักๆ คือ จาก instance ตรงๆ, จาก class

    it('model instance remove',(done)=>{
        // เหมาะกับกรณีที่เรามี instance นั่นอยู่แล้ว
        joe.remove()
            .then(()=> User.findOne({name:'Joe'}))
            .then(user=>{
                assert(user === null);
                done();
            });
    });

    it('class method remove',(done)=>{
        // Remove a bunch of records with some given criteria
        User.remove({name:'Joe'})
            .then(()=> User.findOne({name:'Joe'}))
            .then(user=>{
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        // Remove first record with given criteria
        User.findOneAndRemove({name:'Joe'})
            .then(()=> User.findOne({name:'Joe'}))
            .then(user=>{
                assert(user === null);
                done();
            });
    });
    
    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(()=> User.findOne({name:'Joe'}))
            .then(user=>{
                assert(user === null);
                done();
            });
    });
});