const express = require('express');
const Router = express.Router();
const model = require('./model');
const Song = model.getModel('song');

// 清除音乐数据
// Song.remove({try_hash: ""}, function (err, doc) {
// });


Router.get('/getsong', function (req, res) {
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({err_code: 1, msg: '请登录'});
    }
    Song.find({user: userid}, function (err, doc) {
        if (!err) {
            return res.json({err_code: 0, data: doc});
        }
        return res.json({err_code: 1, msg: '查找失败'});
    })
});

Router.post('/updatesong', function (req, res) {
    const user = req.cookies.userid;
    const {try_hash, try_singer_name, try_imgurl, try_song_name} = req.body;
    Song.findOne({user, try_hash}, function (err, doc) {
        if (doc) {
            return res.json({err_code: 1, msg: '已存在列表中'});
        }
        const songModel = new Song({user, try_hash, try_singer_name, try_imgurl, try_song_name});
        songModel.save(function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错'});
            }
            return res.json({code: 0});

        });
    });
});

module.exports = Router;
