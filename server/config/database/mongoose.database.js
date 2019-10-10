
const config = require('../environment');
const mongoose = require('mongoose');
const mongo = config.database.mongoosedb;

/**
 * 마이스탁리뷰 DB 커넥션
 */
// function connect() {
//     mongoose.connect(`${mongo.dialect}://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.path}`,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(console.log('mongoDB Connection Success'));
// }
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



// const sequelize = new Sequelize(mystockDb.schema, mystockDb.username, mystockDb.password, {
//     dialect: mystockDb.dialect,
//     host: mystockDb.host,
//     port: mystockDb.port,
//     pool: {
//       max: Number(mystockDb.pool.max),
//       min: Number(mystockDb.pool.min),
//       acquire: Number(mystockDb.pool.acquire),
//       idle: Number(mystockDb.pool.idle),
//     },
//     define: {
//       underscore: true,
//       freezeTableName: true,
//     },
//     logging: (log) => {
//       if (config.env === 'development') {
//         logger.info(log, `in ${mystockDb.schema}`);
//       }
//     },
//   });