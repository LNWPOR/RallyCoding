const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' }); //res.send คือ ส่ง object นี้เป็น response เลย
                                // อย่าเมากับ send ของ supertest นะ คนละอย่างกัน
    },
    index(req, res, next) {
        const { lng, lat } = req.query;
        // https://google.com?lng=80&lat=20  ข้างหลัง ? จะถูกยัด property เป็น query มาให้ใช้ได้
        // ระวังนะ query มันมาเป็น string ดังนั้นเลขพวกนี้มันมาเป็น string นะ

        const geoNear = (lng, lat, distance = 200000) => ({
            '$geoNear': {
              'near': {
                'type': 'Point',
                'coordinates': [parseFloat(lng), parseFloat(lat)]
              },
              'spherical': true,
              'distanceField': 'dist',
              'maxDistance': distance
            }
        })

        Driver
            .aggregate([geoNear(lng, lat)])
            .then(drivers => res.send(drivers))
            .catch(next);
    },
    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },
    edit(req, res, next){
        const driverId = req.params.id; // .id เนื่องจากตรง wildcard เราตั้งเป็น :id // จะตั้ง wildcard เป็นอย่างอื่นก็ได้ ดังนั้นตรงนี้ก็ต้องเปลี่ยนตาม
                                        // params มีได้มากกว่า 1 prop นะ ตาม wildcard เลยส่งอะไรมสบ้าง /:id/:id2 blaๆ
        const driverProps = req.body;
        // ระวังนะ findByIdAndUpdate ไม่คืน object ที่ update แล้วมาให้นะ แต่ คืน object ที่ find ได้มาให้
        // ดังนั้นตอน ใช้ .then((driverId)) ของมัน ก็ระวังด้วยว่า driverId คือยังไม่ใช่อันที่อัพเดทแล้วนั่น
        // ดังนั้น เพื่อความชัวร์ก็ find เองใหม่อีกรอบ
        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({ _id: driverId}))
            .then(driver => res.send(driver))
            .catch(next);
    },
    delete(req, res, next) {
        const driverId = req.params.id;
        Driver.findByIdAndRemove({ _id: driverId })
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }
};