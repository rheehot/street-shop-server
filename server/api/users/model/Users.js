const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    nickName: String,
    userId: { type:String, required: true },
    userTags: {type: Array, default: []},
    userPasswords: String,
    userFavorites: {type: Array, default: []},
    kakao : {type: Object, default: {}},
    owner : {type: Boolean, default: false },
    onwerName : String,
    shopName : String,
    openTime: Date,
    closeTime: Date,
    longitude : mongoose.Types.Decimal128, 
    latitude : mongoose.Types.Decimal128,
    shopInfo: Object,
    isUser: { type: Boolean, default: false }, //가입 정보
    deleted: { type: Boolean, default: null } //탈퇴 정보
});

global.Users = global.Users || mongoose.model('users', UsersSchema);
const Users = mongoose.model('users', UsersSchema);
module.exports = Users;