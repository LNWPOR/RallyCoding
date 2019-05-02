const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // จับ promise ของ mongoose ให้ใช้ promise ของ ES6 (global.Promise)

// เพื่อกันว่า ต้องต่อ db ให้สำเร็จจริงก่อน ก่อนเริ่ม Test ดังนั้นเอาตรง connect มาทำใน before
// before only executed once time for the entire test
// before(()=>{
before((done)=>{
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        // event handler watch for mongoose to emit an event called open
        .once('open',() => {done();})
        // event handler watch for mongoose to emit an event called error
        .on('error', (error)=>{
            console.warn('Error',error);
        });
});

// // Tell Mongoose to connect to Mongo
// mongoose.connect('mongodb://localhost/users_test');
// mongoose.connection
//     // event handler watch for mongoose to emit an event called open
//     .once('open',() => console.log('Good to go!'))
//     // event handler watch for mongoose to emit an event called error
//     .on('error', (error)=>{
//         console.warn('Error',error);
//     });
// // *** mongoose อาจมีบางที่ที่ไม่ควรใช้ fat arrow function

// hook = function that will be executed before any test gets executed inside of our test suite.
// beforeEach = hook
// เอามาช่วยล้าง db ให้ก่อนรันแต่ละเทส ข้อมูลจะได้ไม่ค้าง ไปกวน test อื่น
// beforeEach(()=>{
// every single function that we write inside of Mocha that we hand off to a beforeEach or in
// IT or Describe gets called with 'done' callback
// ดังนั้นเอามาใช้เป็น signal ส่งบอก mocha ได้ว่าเสร็จแล้ว รันเทสต่อไปได้
// ถ้ารับ done เป็น argument ดังนั้นยังไงก็ต้องใช้สักที่นึงนะ
beforeEach((done)=>{   
    // // mongoose.connection.collections.users.drop();// ใช้เวลา ดังนั้นต้องมีอะไรมาบอกว่าเสร็จแล้ว แล้วจึงค่อยเริ่ม Test อย่าเริ่ม Test ก่อน drop เสร็จ
    // mongoose.connection.collections.users.drop(()=>{
    //     // Ready to run the next test!
    //     done();
    // });


    // ทำตามนี้แล้วบัค
    // // อย่าลืมว่า mongoose มันปรับชื่อ model ให้แล้วนะ ปรับ plural , ตัวเล็ก
    // const {users, comments, blogposts} = mongoose.connections.collections;// ES6
    // users.drop(()=>{
    //     comments.drop(()=>{
    //         blogposts.drop(()=>{
    //             done();
    //         });
    //     })
    // });

    mongoose.connection.db.dropDatabase(()=>{
        done();
    });
})