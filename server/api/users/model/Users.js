const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userId: String,
    userTags: String,
    userPasswords: String
});

global.Users = global.Users || mongoose.model('users', UsersSchema);
const Users = mongoose.model('users', UsersSchema);

module.exports = Users;