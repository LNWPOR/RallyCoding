const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // เนื่องจากพิมพ์ใหญ่กับพิมพ์เล็กมองต่างกัน ดังนั้นเปลี่ยนทุก req ที่เข้ามาให้เป็น lowercase ให้หมดก่อนเช็ค unique
    password: String
});

// On Save Hook, encrypt password
// pre = Before saving a model, run this function
userSchema.pre('save', function(next){
    // get access to the user model
    const user = this;

    // generate a salt then run callback // salt = randomly generated string of character
    // = encryption key
    bcrypt.genSalt(10, function(err, salt){
        if(err){ return next(err);}

        // hash (encrypt) our password using the salt
        // encrypt password แล้วก็เอามารวมร่างกับ salt อีกที แล้วเก็บร่างรวมลง base
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){ return next(err);}
            
            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

// when we create User object
// object นั้นจะมี method ที่เราสร้างนี้ให้เรียกใช้
userSchema.methods.comparePassword = function(candidatePassword, callback){
    // bcrypt.compare
    // automatic เอา this.password (password จาก base) มาแยก salt ออกแล้ว เอาไปรวมร่างกับ candidatePassword ที่ signin มา
    // แล้วเช็คให้เองอัตโนมัติว่าตรงกันไหมกับ this.password
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){return callback(err);}
        callback(null, isMatch);
    });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;