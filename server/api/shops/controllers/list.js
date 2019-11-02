const shops = require('../model/shops')

async function list(req, res) {
    const test = await shops.find().exec().catch(err => console.log(err));
    console.log(test)
    res.send(test)
    //localhost:port/api/test 에서 확인 가능.
}

module.exports = list;
