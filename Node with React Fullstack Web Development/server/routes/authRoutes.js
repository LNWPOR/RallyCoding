const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { // ถ้ามา path นี้ดังนั้นให้ passport ทำ auth ด้วย strategy google
        scope: ['profile', 'email'] // specifiy to google server what information about user we want to have
    }));
    
    // เนื่องจาก ตอนเข้า path นี้หลังจากกลับมาจาก oauth สำเร็จ
    // มันจะมี response_type code ติดมาด้วย
    // ทำให้ passport google ตรงนี้รู้เองว่านี่เป็นขากลับมาจาก oauth ไม่ใช่ขาที่กำลังจะทำ auth
    // ดังนั้นมันจะนำ code ที่ได้มาไป req แลกข้อมูลตาม scope ที่กำหนดขอไว้มาให้ด้วยเลย
    // แล้วพอได้ข้อมูลกลับมาก็จะไปเข้า callback ที่กำหนดไว้ตรง strategy
    // app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res)=>{ // เป็น handler ที่ทำต่อหลังจาก passport.authenticate ทำเสร็จ
            res.redirect('/surveys');
        }
    );


    app.get('/api/logout', (req, res) => {
        req.logout(); // req มี logout ให้ใช้เนื่องจากมันถูก passport ใส่ไว้ให้โดยอัตโนมัติตอน req เข้ามา // kill the cookie in there
        // res.send(req.user); // ดังนั้นจะได้หน้าว่าง เพราะ req.user ไม่มีค่าแล้ว
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};