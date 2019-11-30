const Users = require('../model/Users')

// 회원정보 조회 함수, POST 요청으로 ID 값이 넘어왔을 때 하나의 내용만 불러와서 조회
async function myInfo(req, res) {
    const myId = req.body.userId;
    const myInfo = await Users.findOne({userId: myId})
    res.send(myInfo)
}

module.exports = myInfo;