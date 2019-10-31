const dotenv = require('dotenv');
const path = require('path');
const _ = require('lodash');
const config_env = require('../../.env');
/* istanbul ignore next */
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

/***** public repository에는 최대한 DB관련된 정보는 남기지 않고 숨김폴더로 관리한다. */

/* istanbul ignore next */
const config = {
    env: process.env.NODE_ENV || 'development',
    root: path.normalize(`${__dirname}/../../..`),
    tz: process.env.TZ || 'Asia/Seoul',
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || '3000',
    database: {
        mongoosedb: {
            dialect: process.env.SSS_DATABASE_TYPE || 'mongodb',
            host: process.env.SSS_DATABASE_HOST || config_env.SSS_DATABASE_HOST,
            port: process.env.SSS_DATABASE_PORT || config_env.SSS_DATABASE_PORT,
            username: process.env.SSS_DATABASE_USERNAME || config_env.SSS_DATABASE_USERNAME,
            password: process.env.SSS_DATABASE_PASSWORD || config_env.SSS_DATABASE_PASSWORD,
            path: process.env.SSS_DATABASE_PATH || config_env.SSS_DATABASE_PATH,
        },
    },
};

module.exports = config;
