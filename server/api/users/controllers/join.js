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


//TODO: 이미 저장되어있는 유저정보에서 추가 입력받은 데이터를 업데이트한다.
// 일반유저와 사장유저일 경우의 두가지 경우로 구분한다.

// 프론트에서 넘겨받는 데이터
// 일반일 경우 userId, owner : false , nickname, 관심태그:[]
// 사장일 경우 userId, owner : true , nickname, shop정보
    // shop정보: { 사장이름, 가게이름, 운영요일: [], 가게태그: [], 운영시작시간: '', 운영종료시간: '', 운영위치: {경도:'', 위도: ''}}

// 프론트에서 넘어온 정보를 통해 각 함수 실행
function classifyJob(req, res){
    const isOwner = req.params.isOwner;

}

// 일반 사용자 데이터 업데이트 함수
function normalUser(req,res){
    const userData = {

    }
    const userUpdate = await Users.Update(userData);
}

// 사장 데이터 업데이트 함수
function ownerUser(req,res){
    const ownerData = {
        
    }
    const ownerUpdate = await Users.Update(ownerData)
}

module.exports = join;
