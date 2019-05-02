const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({name:undefined});
        const validationResult = user.validateSync(); // return validation result object 
        // user.validateSync() = validate แบบ Synchonous
        //ถ้า validate ธรรมดาจะรับ callback ไว้เผื่อ เราจะยิงไป validate ที่ไหน ไป webservice, db บลาๆ แบบ Asyn
        /*
            user.validate((validationResult)=>{

            })
        */
        // console.log(validationResult);
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.');
    });

    it('requires a user\'s name longer than 2 characters', () => {
        const user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.')
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({name:'Al'});
        user.save()
            .catch((validationResult)=>{// ถูก call เมื่อเราพยายามจะทำงานกับ invalid record
                const {message} = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters.')
                done();
            });
    });
});

