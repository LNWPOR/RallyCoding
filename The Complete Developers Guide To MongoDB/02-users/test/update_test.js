const assert = require('assert');
const User = require('../src/user');
describe('Updating records',()=>{
    let joe;
    beforeEach((done)=>{
        // joe = new User({name:'Joe', postCount:0})
        joe = new User({name:'Joe', likes:0})
        joe.save()
            .then(()=>done());
    });

    function assertName(opertation, done){
        opertation
            .then(()=> User.find({}))
            .then((users)=>{
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            })
    }

    // 5 ways to update

    it('instance type using set n save', (done) => {
        joe.set('name','Alex');// บรรทัดนี้ยังไม่อัพเดทไปที่ db นะ
        assertName(joe.save(),done);
    });
    // it('instance type using set n save', (done) => {
    //     joe.set('name','Alex');// บรรทัดนี้ยังไม่อัพเดทไปที่ db นะ
    //     joe.save()
    //         .then(()=> User.find({})) // ใส่ criteria ด้วย empty object = เอาทั้งหมด
    //         .then((users)=>{
    //             assert(users.length === 1);
    //             assert(users[0].name === 'Alex');
    //             done();
    //         })
    // });

    it('A model instance can update', (done) => {
        assertName(joe.update({name:'Alex'}),done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.update({ name:'Joe'}, {name:'Alex'})/*2 argument 1 = criteria,2 = field ที่จะแก้*/,
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({name:'Joe'},{name:'Alex'}),
            done
        );
    });

    it('A model class can find a record with an Id and update', (done) => {

        // เหมาะกับกรณีที่รู้ ID
        assertName(
            User.findByIdAndUpdate(joe._id,{name:'Alex'}),
            done
        );
    });

    //=============================

    // // xit = ให้มันข้ามเทสนี้ไปก่อน เหมือนว่ายังเขียนเทสนี้ไม่เสร็จไม่พร้อมให้รัน
    // xit('A user can have their postcount incremented by 1', (done) => {
    //     // *** ไม่ควรใช้วิธี find user จาก db มาใส่ server แล้วสั่งให้ เพิ่ม
    //     // เนื่องจากเราควรหลีกเลี่ยงการโหลดข้อมูลเข้า server ให้มากที่สุด
    //     // ควรใช้วิธี สั่งให้ MongoDB find และ increase ให้เองเลย
    //     // *** ดังนั้นใช้ mongoose ผสมรวมกับ "mongo update operator"
    //     // https://docs.mongodb.com/manual/reference/operator/update/
    //     // (mongo update operator มักมีประโยชน์ในการแก้ไขข้อมูลด้วยการใช้ logic จำนวนมากในครั้งเดียว)
    //     // *** ดังนั้น update ที่เกี่ยวกับ logic ของจำนวนมากในครั้งเดียว นึกถึง mongo update operator
    //     User.update({name:'Joe'}, { $inc:{postCount:1}})
    //         .then(()=>User.findOne({name:'Joe'}))
    //         .then((user)=>{
    //             assert(user.postCount === 1);
    //             done();
    //         });
    //     // แต่ถ้า update อย่างเช่นเปลี่ยน ชื่อ ทุก Joe เป็น Alex ก็ใช้ วิธี User.update({ name:'Joe'}, {name:'Alex'}) เหมือนเดิมก็ได้ เพราะ ไม่ได้ใช้ logic จำเป็นอะไร
    // });

    //======================
    it('A user can have their postcount incremented by 1', (done) => {
        User.update({name:'Joe'}, { $inc:{likes:1}})
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.likes === 1);
                done();
            });
    });
});