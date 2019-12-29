const Users = require('../model/Users');
const Shops = require('../../shops/model/shops');

// TODO: 이미 저장되어 있는 유저정보에서 추가 입력받은 데이터를 업데이트한다.
// 일반유저와 사장유저일 경우의 두가지 경우로 구분한다.
async function join(req, res){
    // 0. 카톡 ID로 조회 절차가 있어야하네-> 카카오 로그인으로 진행, false 로 저장되네
    // 1. 먼저 조회를 한다. 가입하려는 이 사람이 회원인지 아닌지 isUser
    // 2. 회원이 아니라면, 가입절차를 진행한다. 진행안은 2가지 일반인지 사장인지
    // 3. 회원가입을 진행한다. 사장의 경우 4-1 의 경우, 일반의 경우 4-2를 진행하게 한다.
    // 4-1. 추가 정보 기입시 shop 정보 조회 -> 없으면 추가.
    // 4-2. 유저 정보 기입 추가
    // 5. 모든 과정 완료후 isUser : true로 교체
    // 1. 카톡 ID로 조회 절차 진행
    const isUser = await Users.findOne({ userId : user.id, isUser : true });
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
                shop: req.body.shopName
            }
            const joinData = await Users.create(ownerData);
            addShop(ownerData.shop,ownerData.userId);
            res.send(`${joinData.nickName}님 환영합니다.`);
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

// shop 정보 추가부분
async function addShop(shopName, ownerId){
    const shopData = {
        shopOwner = req.body.ownerId,
        shopName = req.body.shopName,
        openDays = req.body.openDays,
        shopTags = req.body.shopTags,
        location = {
            longitude: req.body.longitude, 
            latitude: req.body.latitude
        },
        startTime = req.body.startTime,
        endTime = req.body.endTime
    }
    const shopInfo = await Users.findOneAndUpdate({ shopOwner : ownerId, shopName : shopName }, shopData, { upsert: true });
    return shopInfo;
}

module.exports = join;
