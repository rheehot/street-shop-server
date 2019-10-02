const dotenv = require('dotenv');
const path = require('path');
const _ = require('lodash')
/* istanbul ignore next */
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

/* istanbul ignore next */
const config = {
    //TODO 바꿔라
    env: process.env.NODE_ENV || 'development',
    root: path.normalize(`${__dirname}/../../..`),
    tz: process.env.TZ || 'Asia/Seoul',
    ip: process.env.IP || '0.0.0.0',
    port: _.toSafeInteger(process.env.PORT) || 3000,
    database: {
        mongoDb: {
            // dialect: process.env.MYSTOCK_DATABASE_TYPE || 'mysql',
            host: process.env.MONGODBURL || 'localhost',
            port: process.env.MYSTOCK_DATABASE_PORT || 27017,
            // username: process.env.MYSTOCK_DATABASE_USERNAME,
            // password: process.env.MYSTOCK_DATABASE_PASSWORD,
            // schema: process.env.MYSTOCK_DATABASE_SCHEMA,
        },
    },
};

module.exports = config;
