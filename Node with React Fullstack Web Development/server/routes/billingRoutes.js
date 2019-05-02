const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');


module.exports = app =>{
    // req post มาที่ express // default express not pass the req payload ดังนั้นต้องใช้ bodyParser ช่วยเอา body ออกมาให้ใช้ได้
    // route handler (get post บลาๆ) รับ middleware ต่อกันได้เป็น parameter เรียงกันได้ ขอแค่ต้องมีอันนึงที่ส่ง response กลับไป
    app.post('/api/stripe', requireLogin, async (req, res)=>{

        const charge = await stripe.charges.create({
           amount: 500,
           currency: 'usd',
           description: '$5 for 5 credits',
           source: req.body.id,//source = token จาก stripe ที่ฝั่ง front ส่งมา
        });

        // อย่าลืมว่า req.user มันมาจาก passport
        // passport มันจะดูว่า req ที่เข้ามามี cookie ไหม ถ้ามีดังนั้นใส่ user ใน req
        // ดังนั้นถ้า user ไม่ได้ login req.user ก็จะ = null ดังนั้นเราต้องเช็คก่อนใช้ req.user ไม่งั้นบึ้ม
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};