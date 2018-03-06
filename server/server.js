const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const songRouter = require('./song');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const Model = require('./model');
const Chat = Model.getModel('chat');

// 清除聊天数据
// Chat.remove({}, function (err, doc) {});

io.on('connection', function (socket) {
    // 前后端联调测试
    // console.log('user login');

    socket.on('sendmsg', function (data) {
        console.log(data);
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        const create_time = new Date().getTime();
        Chat.create({chatid, from, to, create_time, content: msg}, function (err, chatdoc) {
            io.emit('receive-msg', Object.assign({}, chatdoc._doc));
        });
    });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/song', songRouter);

server.listen(9093, function () {
    console.log('server start already');
});