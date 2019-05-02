const assert = require('assert');
const request = require('supertest'); // ใช้ช่วย mocha test express ในการยิง req เข้า api
const app = require('../app');

describe('The express app', () => {
    it('handles a GET request to /api', (done) => {
        request(app)
            .get('/api')
            .end((err, response) => {
                assert(response.body.hi === 'there');
                done();
            });
    });
});