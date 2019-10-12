const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    userId: String,
    userTags: String,
    userPasswords: String
});

global.Test = global.Test || mongoose.model('users', TestSchema);
const Test = mongoose.model('users', TestSchema);

module.exports = Test;
