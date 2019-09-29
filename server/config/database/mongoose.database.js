
const config = require('../environment');

const mystockDb = config.database.mystock;

/**
 * 마이스탁리뷰 DB 커넥션
 */

const mongooseDb=()=>{
//TODO ㅊㅐ워라

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