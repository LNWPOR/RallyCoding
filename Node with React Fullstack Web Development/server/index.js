const express = require('express'); // nodejs ใช้ commonjs ซึ่ง require share code แต่ละไฟล์
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // เอามาเพื่อให้ express สามารถใช้ cookie ได้
const passport = require('passport');
const bodyParser = require('body-parser');// req ที่มี body มาที่ express // default express not pass the req body ดังนั้นต้องใช้ bodyParser middleware ช่วยเอา body ออกมาให้ใช้ได้ ใส่ req.body ให้ express ใช้ได้
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport'); // แค่อยากให้ script ในไฟลรันเฉยๆ ดังนั้น require เฉยๆ

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// set cookie setting ให้ express
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // อายุ 30 วัน
        keys: [keys.cookieKey] // เอา user.id ที่จะใช้เป็น token มา encrypt ตาม keys นี้ // ที่เป็น array เพราะว่า มันสามารถ random เลือก key ไปใช้ encrypt ได้ด้วย
    })
);

// บอก passport ให้ใช้ cookie ในการ auth
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // เนื่องจากใช้ require มันจะ return function ที่ exports ไว้ออกมา ดังนั้นเอามาเรียกใช้ท่านี้ได้เลย
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// การ route client ตอน deploy
// ต้องให้ express ส่งของ client ให้ browser
if(process.env.NODE_ENV === 'production'){
    // ถ้า url ที่ user ยิงมา path ไม่ตรงกับ api เลยสักอัน ดังนั้น อาจเป็น route เพื่อมาเอาไฟล์
    // Express will serve up productuib assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // ถ้า url ที่ user เรียกมาไม่ตรง route อะไรก่อนหน้านี้เลยดังนั้นโยน index.html ให้ ให้ไป route ตาม react route ของ index.html เอา
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// ตอน Heroku run app เรา สามารถยัดค่า port ที่มันอยากให้เราแอพเราใช้มาใน env ได้
const PORT = process.env.PORT || 5000 // 5000 สำหรับ ตอนเรา dev เนื่องจากเราไม่มี env PORT
app.listen(PORT);




//============================================
// const express = require('express'); // nodejs ใช้ commonjs ซึ่ง require share code แต่ละไฟล์
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('./config/keys');

// const app = express();

// passport.use(
//     new GoogleStrategy({ // google strategy ข้างในมันมีบอกตั้งชื่อตัวเองไว้อยู่แล้วว่า 'google' ดังนั้นจึงเอาชื่อไปใชได้เเลย เช่นตอน passport.authenticate('google') มันก็จะรู้เลยว่าหมายถึง strategy นี้
//         clientID: keys.googleClientID,
//         clientSecret: keys.googleClientSecret,
//         callbackURL: '/auth/google/callback' // path ที่จะให้ user ไปต่อ หลังจาก กดตกลงจากหน้าต่าง oauth แล้ว
//     }, 
//     // accessToken => {
//     (accessToken, refreshToken, profile, done) => { // หลังจากเอา responseType code ไปยิงเอาข้อมูลมา ก็จะกลับมาเข้า callback นี้ โดยจะได้ข้อมูลต่างๆมา เช่นนี้
//         // console.log('access token', accessToken); // ใช้เพื่อบอกกูเกิลบอกว่าในอดีต user คนนี้เคยอนุญาตให้เราทำ .... และ accessToken นี้คือหลังฐานว่าเราได้รับอนุญาติแล้ว
//         // console.log('refresh token', refreshToken); // เนื่องจาก access token มีหมดอายุอัตโนมัติ ดังนั้นใช้ refreshToken เพื่อรีอายุ accessToken
//         // console.log('profile', profile); // ข้อมูล user
//         // โดยหลังจากได้ข้อมูลบลาๆจนถึงจุดนี้แล้ว ก็ขึ้นอยู่กับเราแล้วว่าจะเอาไปทำอะไรต่อ เช่น เอาไปสร้างเก็บข้อมูล user ลง base บลาๆ
//     })
// );

// app.get('/auth/google', passport.authenticate('google', { // ถ้ามา path นี้ดังนั้นให้ passport ทำ auth ด้วย strategy google
//     scope: ['profile', 'email'] // specifiy to google server what information about user we want to have
// }));

// // เนื่องจาก ตอนเข้า path นี้หลังจากกลับมาจาก oauth สำเร็จ
// // มันจะมี response_type code ติดมาด้วย
// // ทำให้ passport google ตรงนี้รู้เองว่านี่เป็นขากลับมาจาก oauth ไม่ใช่ขาที่กำลังจะทำ auth
// // ดังนั้นมันจะนำ code ที่ได้มาไป req แลกข้อมูลตาม scope ที่กำหนดขอไว้มาให้ด้วยเลย
// // แล้วพอได้ข้อมูลกลับมาก็จะไปเข้า callback ที่กำหนดไว้ตรง strategy
// app.get('/auth/google/callback', passport.authenticate('google'));

// // ตอน Heroku run app เรา สามารถยัดค่า port ที่มันอยากให้เราแอพเราใช้มาใน env ได้
// const PORT = process.env.PORT || 5000 // 5000 สำหรับ ตอนเรา dev เนื่องจากเราไม่มี env PORT
// app.listen(PORT);
//==========================================