const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth');

// App Setup
// register middlewares
app.use(morgan('combined')); // morgan = logging framework // log the incoming request
app.use(cors()); // จัดการเรื่องอนุญาติให้ domain port อื่นยิงเข้ามาได้ไหม ให้หมดไหม
app.use(bodyParser.json({ type: '*/*'})); // parse req into json no matter req type
router(app);

// Server Setup
const port = process.env.PORT || 3090;
// create http switch server that know how to recieve the request and send to the app to handle
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);