// the purpose of this file is to write some test in here that is going  to make sure
// that we can create a new user and save it to our database.

// ทุก หัว test file ต้องมี describe block/ describe function 
// ซึ่งจะประกอบด้วย IT block/ IT function ภายใน
// ซึ่ง describe กับ it มันมีมาให้โดยอัตโนมัติจาก Mocha อยู่แล้ว ดังนั้นไม่ต้อง import ใช้ได้เลย
// แต่ไม่ได้ import assertion มาให้ ดังนั้นต้องเพิ่มเอง

const assert = require('assert');
const User = require('../src/user');

// 2 agrument ชื่อไว้ให้เรารู้ว่านี้ไว้เทสอะไร, function
describe('Createing records',()=>{
    // whenever Mocha see IT function
    // it's going to say ah the user/dev is trying to run some type of test inside of this function
    // it will cue up all of the different IT functions inside the entire test suite that we've written
    // then will run them all one at a time
    it('saves a user',(done)=>{
        // inside IT function we need to make what is called an "Assertion"
        // Assertion = a piece of code where we say I really hope that this value is equal to this value
        // ถ้าไม่มี assert ใน IT ดังนั้น Mocha จะ assume ว่า pass
        // assert(1 + 1 === 2);
        // ซึ่ง mocha จะจำค่า ture/false จาก assert ใน IT functino ไว้

        const joe = new User({ name:'Joe'}); // joe = 1 instance of user = 1 record
        // บรรทัดนี้ยังไม่ save ให้นะ

        // joe.save();// บรรทัดนี้ save // ดังนั้นต้องใช้เวลา
        // *** ให้คิดไว้ว่าอะไรที่น่าจะมาในอนาคต แสดงว่าจะต้องรอ ดังนั้นน่าจะมีคืน promise ให้
        // save return promise
        // *** NOTE: default มันจะใช้ promise lib ที่ฝังอยู่ใน mongoose ซึ่ง deprecate แล้ว
        // ดังนั้น เราสามารถเปลี่ยนไปใช้ 3rd party ตัวอื่นได้ เช่น bluebird,q, หรือใช้ ES6 Promise
        // เช่นจะใช้ Promise ES6 ดังนั้น ต้องประกาศ mongoose.Promise = global.Promise ไว้ก่อน
        joe.save()
            .then(()=>{
                // Has joe been saved successfully?
                assert(!joe.isNew);
                done();
            });
    });
});