// ตั้งชื่อว่า post.js ก็จริง แต่อย่าเข้าใจผิดว่าเป็น model นะ
// จะใช้เป็นแค่ schema
// จริงๆอาจใช้วิธีตั้งชื่อให้แตกต่าง เช่นตั้งเป็น post_schema.js ก็ได้
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});
module.exports = PostSchema;