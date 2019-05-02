// บน heroku ค่านี้จะถูก set เป็น production อัตโนมัติ แต่ถ้าบนเครื่องตัวเองจะยังไม่ถูก defined
if(process.env.NODE_ENV === 'production'){
    // we are in production - return the prod set of keys
    module.exports = require('./prod');
}else{
    // we are in development - return the dev keys
    module.exports = require('./dev');
}