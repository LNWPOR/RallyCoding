const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
                                                // เนื่องจาก default passport มันพยายามจะสร้าง cookie base
                                                // ดังนั้นเราต้องมาหยุดมันไว้โดย session:false เนื่องจากเราจะใช้ jwt ไม่ใช้ cookie
// helper
const requireAuth = passport.authenticate('jwt', { session: false });
                                            // ใช้ jwt Strategy
const requireSignin = passport.authenticate('local', { session:false });

module.exports = function(app){
    // ไม่ว่าจะไปพาทไหน ต้องผ่านพาท root '/' ก่อน
    // ดังนั้นเอาพาท '/' มาเชคก่อนไปทุกพาท อารมณ์เหมือนเป็น middleware คั่นก่อน
    // เชคว่า authen ยัง
    app.get('/', requireAuth, function(req, res){
        res.send({ message: 'Super secret code is ABC123' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    
    // app.get('/', function(req, res, next) {
    //     res.send(['waterbottle', 'phone', 'paper'])
    // });
};