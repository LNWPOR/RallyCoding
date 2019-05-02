// passport is what's going to help us authenticate a user when they attemp to visit a route that requires authentication
// ช่วย check ว่าจะไปพาทนี้ๆๆ คนนี้ login ยัง ไปได้ไหม
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// Strategy = a method for authenticate the user
// = วิธีในการ authen
// มีมากมายหลาย Strategy มากในการ authen user
// ใช้ JwtStrategy ในการ authen ด้วย jwt
const LocalStrategy = require('passport-local');// authen ด้วย username and password ที่ db local

// Create local strategy
const localOptions = {usernameField:'email'} // โดย default มันจะไปหา username,password field ใน req มาสร้างตัวแปลไว้ให้เรียกใช้ได้อัตโนมัติ
                                            // แต่เราอยากใช้ email field ไม่ใช่ username ดังนั้นต้องกำหนด option ก่อน
                                            // เอาค่าที่ไปดูจาก req ได้มาเรียก callback ตาม username,password,done
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise call done with false
    User.findOne({email:email}, function(err, user){
        if(err){return done(err);}
        if(!user){return done(null, false);}

        // compare passwords - is 'password' equal to user.password
        user.comparePassword(password, function(err, isMatch){
            if(err){return done(err);}
            if(!isMatch){ return done(null, false);}

            return done(null, user);
        });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // เนื่องจาก token jwt มันจะอยู่ตรงไหนของ req ก็ได้อาจจะอยู่ ที่ url, body, header ดังนั้นเราต้องบอกว่าให้หาตรงไหน
                                                        // = ไปหาที่ header field authorization
    secretOrKey: config.secret // secret ที่จะใช้ decode token
};

// Create JWT strategy
                                                    // payload = ก้อน information ตอน encode
                                                    // call done ตอนเสร็จ
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done with a user object
    User.findById(payload.sub, function(err, user){
        if(err){return done(err, false)}; // 2nd argu = user object ที่ ที่เจอ // ไม่เจอจึงใส่ false แปลว่าไม่ user ยังไม่ auth
        if(user){
            done(null, user); // done with null err and เจอ user
        } else{
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);