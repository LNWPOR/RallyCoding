const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// user ที่ได้มานี่คือ user ที่เราสั่ง done มาจาก (1)
passport.serializeUser((user, done) => {
    done(null, user.id); //error, identify information of user //user.id คนละอันกับ profile.id นะ แต่เป็น _id ของ collection จาก mongo
    // ที่ต้องใช้ user.id แทน profile.id เนื่องจาก เราอาจ oauth จากหลายแหล่ง อาจไม่ใช่แค่ google อาจเป็น facebook บลาๆ ดังนั้นแต่ละอย่าง id จากที่ต่างๆอาจมีไม่มีไม่เหมือนกัน ดังนั้นใช้ที่ gen จาก mongo ดีกว่า
    // oauth ช้แค่ตอน signin แต่หลังจากนั้นเราจะใช้ id จาก db ของเราลุยต่อเอง
});

passport.deserializeUser((id, done)=>{ //1st argument = token ที่จะใช้ identify ซึ่งเราใช้ user.id
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({ // google strategy ข้างในมันมีบอกตั้งชื่อตัวเองไว้อยู่แล้วว่า 'google' ดังนั้นจึงเอาชื่อไปใชได้เเลย เช่นตอน passport.authenticate('google') มันก็จะรู้เลยว่าหมายถึง strategy นี้
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', // path ที่จะให้ user ไปต่อ หลังจาก กดตกลงจากหน้าต่าง oauth แล้ว
        proxy: true // บอกใ้ห้ googleStrategy ว่าถ้า req มีการผ่าน proxy ก็โอเคร ไม่เป็นไรทำงานได้ตามปกติ
    }, 
    // (1)
    // accessToken => {
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser){
            return done(null, existingUser);
        }
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
    })


    // (accessToken, refreshToken, profile, done) => { // หลังจากเอา responseType code ไปยิงเอาข้อมูลมา ก็จะกลับมาเข้า callback นี้ โดยจะได้ข้อมูลต่างๆมา เช่นนี้
    //     // console.log('access token', accessToken); // ใช้เพื่อบอกกูเกิลบอกว่าในอดีต user คนนี้เคยอนุญาตให้เราทำ .... และ accessToken นี้คือหลังฐานว่าเราได้รับอนุญาติแล้ว
    //     // console.log('refresh token', refreshToken); // เนื่องจาก access token มีหมดอายุอัตโนมัติ ดังนั้นใช้ refreshToken เพื่อรีอายุ accessToken
    //     // console.log('profile', profile); // ข้อมูล user
    //     // โดยหลังจากได้ข้อมูลบลาๆจนถึงจุดนี้แล้ว ก็ขึ้นอยู่กับเราแล้วว่าจะเอาไปทำอะไรต่อ เช่น เอาไปสร้างเก็บข้อมูล user ลง base บลาๆ
    //     // call done เพื่อบอก passport ว่า เราจบเรื่องของเราแล้ว ทำ flow auth ของ passport ต่อเลย

    //     User.findOne({googleId:profile.id})
    //         .then(existingUser => {
    //             if(existingUser){
    //                 // we already have arecord with the given profile ID
    //                 done(null, existingUser); // error, user ที่ create
    //             }else{
    //                 // we don't have a user record with this ID, make a new record
    //                 new User({ googleId: profile.id })
    //                     .save()
    //                     .then(user => done(null, user));
    //             }
    //         })
    // })
);