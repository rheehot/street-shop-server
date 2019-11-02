const shops = require('../model/shops')

async function list(req, res) {
    const list = await shops.find().exec().catch(err => console.log(err));

    res.send(list)
}

module.exports = list;
