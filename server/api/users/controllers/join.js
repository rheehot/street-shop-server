const Users = require('../model/Users')

async function join(req, res) {
    const test = await Users.find().exec().catch(err => console.error(err));
    res.send(test)
}

module.exports = join;
