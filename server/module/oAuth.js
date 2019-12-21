const axios = require('axios');

const tokenCheck = (token) => {
	axios({
		methoe: 'get',
		url: 'https://kapi.kakao.com/v1/user/access_token_info',
		headers: { 'Authorization': token },
		responseType: 'json'
	}).then((response) => {
		console.log(response)
	})
}

module.exports = tokenCheck;