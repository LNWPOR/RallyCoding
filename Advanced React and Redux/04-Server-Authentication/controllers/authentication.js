const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
                    // information we want to encode, secret use for encrypt
                    // ควรใช้ user id ไม่ใช้ email เนื่องจาก email ของ user สามารถเปลี่ยนแปลงได้ตลอด
                    // sub = subject = who this token belong to
                    // iat = issue at time
                    // ซึ่งทั้งก้อน information นี้จะไปเป็น payload ตอนใช้ passport jwt strategy
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
    // User has already had their email and password auth
    // We just need to give them a token

    // เนื่องจาก ก่อนจะมาฟังชันนี้ มันวิ่งไปเข้า middleware requireSignin มา
    // ซึ่งมี done(null, user) หรือก็คือมันจะเอา user ส่งเป็น parameter req มาให้ path ถัดไป
    // ดังสามารถเรียก req.user ได้
    res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({ error: 'You must provide email and password'});
    }

    // See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser){
        if(err) { return next(err);}

        // If a user with email does exist, return an error
        if(existingUser){
            return res.status(422).send({ error: 'Email is in use'});
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err){
            if(err) { return next(err);}
            // Respond to request indicating the user was created
            // res.json({ success: true });
            res.json({ token: tokenForUser(user) });
        })

    });


}