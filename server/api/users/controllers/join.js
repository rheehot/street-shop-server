const Users = require('../model/Users')

async function join(req, res) {
    const test = await Users.find().exec().catch(err => console.error(err));
    console.log(test)
    res.send(test)
    //localhost:port/api/test 에서 확인 가능.
}

module.exports = join;
