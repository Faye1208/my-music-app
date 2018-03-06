const express = require('express');
const utils = require('utility');
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const Router = express.Router();
const _filter = {'pwd': 0, '__v': 0};

// 清除用户数据
// User.remove({}, function (err, doc) {});

Router.get('/info', function (request, response) {
    // console.log(request.cookies);
    // 检验该用户是否存储了登录或注册时后端存储在response里面的cookie
    const {userid} = request.cookies;
    if (!userid) {
        return response.json({code: 1});
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return response.json({code: 1, msg: '后端出错了'});
        }
        if (doc) {
            return response.json({code: 0, data: doc});
        }
    });


});

Router.get('/userdoc', function (request, response) {
    User.find({}, function (err, doc) {
        if (!err) {
            return response.json({userdoc: doc});
        }
    })
});

Router.get('/chatdoc', function (request, response) {
    Chat.find({}, function (err, doc) {
        if (!err) {
            return response.json({chatdoc: doc});
        }
    })
});

Router.get('/list', function (request, response) {
    console.log(request.query);
    const {type} = request.query;
    User.find({type}, function (err, doc) {
        if (doc) {
            return response.json({code: 0, data: doc});
        }
    });
});

Router.get('/getmsglist', function (request, response) {
    const user = request.cookies.userid;
    User.find({}, _filter, function (err, userdoc) {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        });
        Chat.find({'$or': [{from: user}, {to: user}]}, function (err, chatdoc) {
            if (!err) {
                return response.json({code: 0, msgs: chatdoc, users});
            }
        });
    });
});

Router.post('/readmsg', function (request, response) {
    const userid = request.cookies.userid;
    const {from} = request.body;
    Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true}, function (err, doc) {
        if (!err) {
            return response.json({code: 0, num: doc.nModified});
        }
        return response.json({code: 1, msg: '更新失败'});
    });
});

Router.post('/register', function (request, response) {
    console.log(request.body);
    const {user, pwd, type} = request.body;
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return response.json({code: 1, msg: '用户名已被使用'});
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type});
        userModel.save(function (err, doc) {
            if (err) {
                return response.json({code: 1, msg: '后端出错'});
            }
            response.cookie('userid', doc._id);
            return response.json({code: 0, data: {user}});
        });
    });
});

Router.post('/login', function (request, response) {
    console.log(request.body);
    const {user, pwd} = request.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        console.log("err:", err);
        console.log("doc:", doc);
        if (!doc) {
            return response.json({code: 1, msg: '用户名密码错误'});
        }
        // 在响应里面写入cookie，这样前端就可以通过这个对用户进行校验
        response.cookie('userid', doc._id);
        return response.json({code: 0, data: doc});
    });
});

Router.post('/update', function (request, response) {
    console.log(request.body);
    const {userid} = request.cookies;
    const body = request.body;
    if (!userid) {
        return json.dumps({code: 1});
    }
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return response.json({data, code: 0});
    });
});

function md5Pwd (pwd) {
    const salt = 'recruitment_app_678459320133@#$%!^&*&^%%$##*&@';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
