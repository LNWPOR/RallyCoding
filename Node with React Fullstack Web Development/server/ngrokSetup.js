var ngrok = require('ngrok');
console.log("ggggggggggggg");
ngrok.connect(function (err, url) {
    console.log('ngrok url:'+url);
});