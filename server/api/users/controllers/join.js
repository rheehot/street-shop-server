const users = require('../model/Users')

async function join(req, res) {
    // 로컬에 만들어 놓은 books라는 컬렉션을 불러옴.
    const test = await users.find().exec().catch(err => console.log(err));
    console.log(test)
    res.send(test)
    //localhost:port/api/users 에서 확인 가능.
}


module.exports = join;
