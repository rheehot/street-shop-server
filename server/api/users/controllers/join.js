const mongoose = require('mongoose')
const users = require('../model/Users')

// async function join(req, res) {
//     // const test = '1234'
//     const test = await users.find().exec().catch(err => console.log(err));
//     console.log(test)
//     res.send(test)

//     //디비연결을 해본다.
//     //localhost:30000/api/users/ 에서 몽구스 연결된것을 확인할 수 있는 페이지 만들기
// }

// module.exports = join;
let connection = null;
const connect = () => {
    // 연결 되어있으면 기존것을 연결시키고
    if (connection && mongoose.connection.readyState === 1) return Promise.resolve(connection);
    // 없으면 새로 연결함
    return mongoose.connect('').then(
        conn => {
            connection = conn;
            return connection;
        }
    );
};

const createResponse = (status, body) => ({
    statusCode: status,
    body: JSON.stringify(body)
});

const join = (event, ctx, cb) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    connect().then(
        // 역순으로, 최대 20개 리스팅
        () => users.find().sort({
            _id: -1
        }).limit(20).lean().exec()
    ).then(
        stories => cb(null, createResponse(200, stories))
    );
};
module.exports = join;
