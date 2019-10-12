const test = require('../model/Test')

async function testfn(req, res) {
    const result = await test.find().exec().catch(err => console.log(err));
    console.log(result)
    res.send(result)
    //localhost:port/api/test 에서 확인 가능.
}


module.exports = testfn;
