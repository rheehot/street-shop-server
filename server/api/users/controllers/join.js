const Users = require('../model/Users');
const Shops = require('../../shops/model/shops');

// 20.01.04 TODO 
//   => 회원가입, Users 모델 돌려놓기

// TODO: 이미 저장되어 있는 유저정보에서 추가 입력받은 데이터를 업데이트한다.
// 일반유저와 사장유저일 경우의 두가지 경우로 구분한다.
async function join(req, res){
    // 카톡 ID로 조회 절차 진행
    const isUser = await Users.findOne({ userId : req.userId, isUser : true });
    const isOwner = req.body.isOwner; 
    if(!isUser){
        // 회원가입을 진행해야 됌
        if(isOwner===true){
            // 사장일 경우 userId, owner : true , nickname, shop정보
            // shop정보: { 사장이름, 가게이름, 운영요일: [], 가게태그: [], 운영시작시간: '', 운영종료시간: '', 운영위치: {경도:'', 위도: ''}}
            const ownerData = {
                userId: req.body.userId,
                owner : isOwner,
                nickName: req.body.nickName,
                shop: req.body.shopName,
                isUser : true
            }
            const joinData = await Users.create(ownerData);
            const isShop = addShop(req);
            if(!isShop){
                res.status(403) 
            } else {
                res.send(`${joinData.nickName}님 환영합니다.`);
            }
        } else {
            // 일반일 경우 userId, owner : false , nickname, 관심태그:[]
            const userData = {
                userId: req.body.userId,
                owner : isOwner,
                nickName: req.body.nickName,
                userFavorites: req.body.userFavorites
            }
            const joinData = await Users.create(userData);
            res.send(`${joinData.nickName}님 환영합니다.`);
        }
    }
}

// SHOP 정보 추가 함수
async function addShop(req){
    const shopData = {
        shopOwner : req.body.ownerName,
        shopName : req.body.shopName,
        openDays : req.body.openDays,
        shopTags : req.body.shopTags,
        location : {
            longitude: req.body.longitude, 
            latitude: req.body.latitude
        },
        startTime : req.body.startTime,
        endTime : req.body.closeTime
    }
    const isValid = validCheck(shopData);
    console.log(isValid)
    if (!isValid){
        return false;
    } else {
        await Shops.findOneAndUpdate({ shopOwner : shopData.shopOwner, shopName : shopData.shopName }, shopData, { upsert: true });
        return true;
    }
}

function validCheck(value){
    if(!value.shopOwner || !value.shopName || !value.openDays || !value.shopTags || !value.location.longitude || !value.location.latitude || !value.startTime || !value.endTime){
        return false;
    } else {
        return true;
    }
}

module.exports = join;
