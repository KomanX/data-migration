const mongoose = require('mongoose');

//数据库连接
mongoose.connect('mongodb://localhost/MessageBoard', {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

var b = {};
b.bnames = String;
var a = new mongoose.Schema(b);
var c = mongoose.model('test', a);
console.log(c.schema.obj);
const User = mongoose.model('User', {
    name: String,
    password: String,
    email: String,
    createTime: Date,
    updateTime: Date,
    accessNum: Number
});

const Message = mongoose.model('Message', {
    author: String,
    msg: String,
    email: String,
    createTime: Date,
    updateTime: Date,
    accessNum: Number
})
console.log(User.schema.obj);
module.exports = { User, Message };