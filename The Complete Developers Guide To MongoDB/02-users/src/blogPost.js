// ก็คือ post นั้นแหละ แต่อันนี้จะสร้างแบบ Separate Collections แทนแบบเดิม
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const BlogPostSchema = new Schema({
    title:String,
    content:String,
    comments: [{
        type: Schema.Types.ObjectId, 
        ref:'comment' // เป็นชื่อ ref ที่กำหนดไว้ตอนตั้งชื่อ model ด้วย mongoose.model
    }]
 });

 const BlogPost = mongoose.model('blogPost', BlogPostSchema);
 
module.exports = BlogPost;
/*
the Types.ObjectId and the ._id properties aren't the same thing.
Types.ObjectId is a class, whereas the ._id is an instance of that class.

Setting up the Types.ObjectId value on a schema informs Mongoose that it
should consider that property to be pointing at another object saved somewhere in
MongoDB.
*/