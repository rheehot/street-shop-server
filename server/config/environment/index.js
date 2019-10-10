const dotenv = require('dotenv');
const path = require('path');
const _ = require('lodash')
/* istanbul ignore next */
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});


// mongodb://<dbuser>:<dbpassword>@ds329058.mlab.com:29058/heroku_dmhkbx4g
/* istanbul ignore next */
const config = {
    //TODO 바꿔라
    env: process.env.NODE_ENV || 'development',
    root: path.normalize(`${__dirname}/../../..`),
    tz: process.env.TZ || 'Asia/Seoul',
    ip: process.env.IP || '0.0.0.0',
    database: {
        mongoosedb: {
            dialect: process.env.SSS_DATABASE_TYPE || 'mongodb',
            host: process.env.SSS_DATABASE_HOST || '',
            port: process.env.SSS_DATABASE_PORT || '',
            username: process.env.SSS_DATABASE_USERNAME || 'localhost',
            password: process.env.SSS_DATABASE_PASSWORD || '',
            schema: process.env.SSS_DATABASE_SCHEMA || '',
            dbname: process.env.SSS_DATABASE_DBNAME || '',
            path: process.env.SSS_DATABASE_PATH || '',
        },
    },
};

module.exports = config;
