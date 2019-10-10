const config = require('../environment');
const mongoose = require('mongoose');
const mongo = config.database.mongoosedb;

const mongooseDb = () => {
    function connect() {
        mongoose.connect(`${mongo.dialect}://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.path}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((err) => {
            console.error('[DATABASE] mongoDB Connection Error')
            console.error(err)
        }).then(console.log('[DATABASE] mongoDB Connection Success'))
    }
    connect();
    mongoose.connection.on('disconnected', connect);
}


module.exports = mongooseDb;
