// const User = require('../model/Users');
const axios = require('axios');

function kakaoLogin(req, res){
    const { token } = req.body;
    console.log(req)
    return axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: 'njb6idcF12A38hByG8N_gvvogALfUoQwsUSej1go9dJcAAAFuuoRpPA',
        responseType: 'json',
    }).then(function (response) {
        console.log(response.data);
        // const id = response.data.id;
        // const nickname = response.data.properties.nickname;
        // const profile_image = response.data.properties.profile_image;
        // const thumbnail_image = response.data.properties.thumbnail_image;

        // const userinfo = [id, nickname, profile_image, thumbnail_image, nickname, profile_image, thumbnail_image];
        // const userJoin = USER.saveUser(userinfo);
        res.send(200, {
            // userJoin,
            // status: 'ok',
        });
        res.send(response.data)
    })
}

module.exports = kakaoLogin;