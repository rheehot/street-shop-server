const config = require('../environment');
const mongoose = require('mongoose');
const mongo = config.database.mongoosedb;

const mongooseDb = ()=>{
    function connect() {
        mongoose.connect(`${mongo.dialect}://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.path}`,(err) => {
            if(err){
                console.error('mongoDB Connection Error')
            } else {
                console.log('mongoDB Connection Success')
            }
        }); 
    }
    connect();
    mongoose.connection.on('disconnected', connect);
}

module.exports = mongooseDb;
