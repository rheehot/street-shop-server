const Users = require('../model/Users');
const axios = require('axios');

function kakaoLogin(req, res){
    const { token } = req.body; //프론트에서 넘겨주는 회원 엑세스 토큰
    return axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {'Authorization' : `Bearer ${token}`},
        responseType: 'json',
        mode: 'cors', //toUpper error fix
    }).then(function (response) {
        const flag = Users.findOne({userId : response.data.id})
        console.log(flag._conditions.userId)
        // TODO: response.data.id ( 회원 고유 아이디 )가 디비에 있는지 확인한다.
        // Error : Error 발생 시 then 에서 중단되어 버려 내부에서 401, 404 error로 분류할 수 없는 문제 발생
        // 있으면 flag 가입유무를 확인해서 가입된 유저이면 로그인, 200
        // 가입되어있지 않은 회원이면 = 401error
        // 아이디가 아예 없으면 디비에 저장후 = 404 error
        res.send(200,response.data.id);
    })
}

module.exports = kakaoLogin;