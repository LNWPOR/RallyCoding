const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database',()=>{
    // let joe;
    let joe, maria, alex, zach;

    beforeEach((done)=>{
        joe = new User({name:'Joe'});// *** mongoose สร้าง _id ให้ตั้งแต่ตรงนี้เลย ไม่ต้องรอ save db ก่อนถึงได้ id
        // mongoose is assuming that i can generate a unique enough ID
        // before it actually gets saved to the database.

        maria = new User({name:'Maria'});
        alex = new User({name:'Alex'});
        zach = new User({name:'Zach'});
        
        // joe.save()
        //     .then(()=>done());

        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(()=>done());
    });

    it('finds all user with a name of joe',(done)=>{
        User.find({name:'Joe'})
            .then((users)=>{
                //assert(users[0]._id === joe._id);// พัง
                // *** พังเนื่องจาก ค่า _id จาก mongoDB หรือจาก mongoose มันเป็น ObjectID("qwerqwerq") ไม่เหมือนกับ DB ชนิดอื่นๆ
                // ไม่ใช่ String เฉยๆ ถึงแม้ค่าจะเท่ากัน แต่ก็จะ false เพราะเราใช้ === ซึ่งเทียบ type ด้วย ดังนั้นจับเทียบกันตรงๆอย่างนี้ไม่ได้
                //ต้องดึง String ของมันออกมาเทียบกัน
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done)=>{
        User.findOne({ _id: joe._id })
            .then((user)=>{
                assert(user.name === 'Joe')
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        // -Alex- [Joe Maria] Zach // สมมุติว่ามันเรียงตัวกันอย่างนี้
        // skip,limit ก็คือ modifier นะ
        User.find({})
            .sort({name:1}) // ใส่ sort modifier เพิ่มไป // { property ที่จะ sort: ทิศทางที่จะ sort [1 น้อยไปมาก,-1 มากไปน้อย]}
            .skip(1)
            .limit(2)
            .then((users)=>{
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});