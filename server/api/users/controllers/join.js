const users = require('../model/Users')

async function join(req, res) {
    const test = await users.find().exec().catch(err => console.log(err));
    console.log(test)
    res.send(test)
    //localhost:port/api/test 에서 확인 가능.
}

module.exports = join;
