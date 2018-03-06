const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/recruitment';
mongoose.connect(DB_URL, {
    useMongoClient: true
});

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},
        'desc': {type: String},
        'title': {type: String},
        'company': {type: String},
        'money': {type: String},
    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'content': {type: String, require: true, default: ''},
        'read': {type: Boolean, require: true, default: false},
        'create_time': {type: Number, default: new Date().getTime()}
    },
    song: {
        'user': {type: String, require: true},
        'try_hash': {type: String},
        'try_song_name': {type: String},
        'try_singer_name': {type: String},
        'try_imgurl': {type: String}
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
};