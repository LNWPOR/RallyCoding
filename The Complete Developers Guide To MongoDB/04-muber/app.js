const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

// // Watch for incomming requests of method GET
// // to the route http://localhost:3050/api
// app.get('/api', (req, res) => {
//     res.send({ hi: 'there' });
// });

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber');
}

// ลำดับการต่อ middleware มีผลนะ
// *** ต้อง ทำ app.use ก่อน route เสมอนะ
app.use(bodyParser.json());
routes(app); // จะคิดว่า route เป็น middleware ก็ได้ // route ก็ต้องมีเรียก next นะเดวไม่งั้นมันไม่ต่อไป middleware ตัวต่อไป

// our own middleware
app.use((err, req, res, next) => { // next = function // ใช้เรียกเพื่อเรียกใช้ middleware ตัวต่อไป
    res.status(422).send({ error:err.message});
    // res.send({ error:err.message});
});

module.exports = app;