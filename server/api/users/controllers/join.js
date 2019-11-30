const Users = require('../model/Users')

async function join(req, res) {
    // Array 요소 : userTags, userFavorites, String 요소 : userId, Passwords(해시 암호화 필요), Object 요소 : Kakao, 
    const joinInfo = {
        userId: req.body.userId,
        nickName: req.body.nickName,
        userTags: req.body.userTags,
        userPasswords: req.body.userPasswords,
        userFavorites: req.body.userFavorites,
        kakao : req.body.kakao,
        owner : req.body.owner
    }
    const join = await Users.create(joinInfo);
    res.send(join)
}

module.exports = join;
