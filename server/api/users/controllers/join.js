const mongoose = require('mongoose')
const users = require('../model/Users')

async function join(req, res) {
    // const test = '1234'
    const test = await users.find().exec().catch(err => console.log(err));
    console.log(test)
    res.send(test)

    //디비연결을 해본다.
    //localhost:30000/api/users/ 에서 몽구스 연결된것을 확인할 수 있는 페이지 만들기
}


module.exports = join;
