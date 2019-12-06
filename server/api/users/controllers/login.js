const Users = require('../model/Users');
const axios = require('axios');

function kakaoLogin(req, res){
    const token = req.headers.authorization;

    return axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {'Authorization':token},
        responseType: 'json',
    }).then(async function(response) {
        //로그인한 유저가 가입된 유저인지(또는 유효한 회원인지) 확인
        const flag = await Users.findOne({ userId : response.data.id, isUser : true });
        if (!flag) {
            return res.sendStatus(404);
        }

        //TODO: 데이터 상의후(회원가입 완료후) 다듬어야 함
        //회원일 경우 유저정보 반환
        const user = response.data;
        const userInfo = {
            uid: user.id,
            nickname: user.properties.nickname,
            image: user.properties.thumbnail_image,
            isOwner: flag.owner,
        }
        if(!flag.kakao.active){
            userInfo.nickname = flag.nickName;
        }
        return res.send(userInfo)
    }).catch(err=>console.error(`[login error] ${err}`))
    
}

module.exports = kakaoLogin;