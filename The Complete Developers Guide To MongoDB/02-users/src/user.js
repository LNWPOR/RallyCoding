const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // name: String,
    // name: {
    //     type: String,
    //     required:[true,'Name is required.'] // 2nd argument = message ที่จะบอก user เมื่อ validate ไม่ผ่าน
    // },
    name: {
        type: String,
        validate:{
            validator: (name) => name.length > 2, // agrument = property name, return true/false
            message: 'Name must be longer than 2 characters.'// ข้อความแสดงเมื่อ validator function fail
        },
        required:[true,'Name is required.']
    },
    // postCount: Number, // Virtual Type = type ที่สร้างมาไว้ใช้ใน server แต่ไม่ได้ save ใช้ใน db
    // เวลาต้องการผลรวม ผลบวก บลาๆ ก็มักจะต้องนึกถึง Virtual Type
    // ดังนั้น field ไหนจะเป็น virtual type ไม่ควรมาประกาศใน schema ตอนสร้าง ควรไปกำหนดแยกอีกทีทีหลังหลังจากมี schema เสร็จแล้ว
    posts: [PostSchema],
    likes: Number,
    blogPosts:[{
        type: Schema.Types.ObjectId,
        ref:'blogPost'
    }]
}, {usePushEach:true}); // จะได้ใช้ .push กับ array ได้
                            // *** พอตอนไปสร้าง collection มันจะเติม s ให้เองใส่ชื่อ colelction -> users

// มาประกาศ virtual field ตรงนี้
// ดังนั้นถ้าเราอ้างถึง virtual field เช่น joe.postCount ดังนั้นด้วย getter ES6 มันจะไม่ดึง ค่า field ของ postCount ออกมา
// แต่จะมาเรียก function ที่กำหนดไว้ให้รันแทน
// ต้องใช้ function แทน fat arrow
UserSchema.virtual('postCount').get(function(){
    // console.log('Hi');
    // return this; // มี this ให้ใช้ ซึ่งก็คือ instance นั้นๆที่เราสนอยู่ ดังนั้นเอาค่า field ต่างๆของ instance นั้นมาใช้เล่นใน function ได้
    // ดังนั้นเลยต้องใช้ function แทน fat arrow เพื่อให้ scope ของ this ถูกต้อง
    return this.posts.length;
});

// ถ้าลบ user ดังนั้นอยากลบ collection อื่นๆที่เกี่ยวข้องด้วย เช่น blogpost,comment
// ดังนั้นนึกถึง middleware
// ใช้ function ไม่ใช้ fat เพราะต้องการใช้ this
UserSchema.pre('remove', function(next){
    // ไปเรียก model ที่ regis กับ mongoose แล้วมาใช้
    // ซึ่งปกติน่าจะ regis เสร็จหมดทุก modelแล้ว ก่อนจะมีการ save,remove บลาๆ ดังนั้นเรียกใช้ได้
    const BlogPost = mongoose.model('blogPost');// ไม่ใช้วิธี require จากไฟล์ BlogPost มาเพราะอาจจะโหลดพันกันงง ถ้า blogPost มีต้อง require user ด้วย
    // this === joe

    // ลบ blogpost ใน collection ที่มี _id ตามใน array this.blogPosts // อย่าลืมว่า this.blogPosts เป็น array ของ _id นะ
    BlogPost.remove({_id:{$in:this.blogPosts}})
        .then(()=>next());
    // เสร็จแล้ว ไปรัน middleware ตัวต่อไป
});

// mongoose มันจะ เอาชื่อไปปรับต่อเอง โดย ปรับ plural ให้ และปรับเป็นตัวเล็กหมด
// user->users
// mouse->mice
// person->people
//blogPost->blogposts
const User = mongoose.model('user', UserSchema);
// 1. hey! mongo do you have collection name 'user' if not I will create one
// 2. everytime you work with 'user' must follow this schema
// 3. ได้ User class/ User model กลับมา ซึ่ง represents the entire collection of data not single user

module.exports = User;
// *** it extreamely common inside of every model file that was created in a project  to
// export only the model