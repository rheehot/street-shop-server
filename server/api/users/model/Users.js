const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    nickName: String,
    userId: String,
    userTags: Array,
    userPasswords: String,
    userFavorites: Array,
    kakao : Object,
    owner : Boolean
});

global.Users = global.Users || mongoose.model('users', UsersSchema);
const Users = mongoose.model('users', UsersSchema);

module.exports = Users;