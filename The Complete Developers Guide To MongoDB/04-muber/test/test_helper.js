const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err =>{
            console.warn('Warning', error);
        });
});

beforeEach(done => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere'})) // เนื่องจาก drop มันจะลบ indexes ของ collection นั้นไปด้วย 
                                                                                // ซึ่งปกติ indexes ของ collection จะถูกสร้างขึ้นมาตอนสร้าง collection เท่านั้น 
                                                                                // ดังนั้นต้องแก้โดยการมาสั่งสร้างเองตรงนี้เอา T^T
        .then(()  => done())
        .catch(() => done());
});