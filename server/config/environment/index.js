const dotenv = require('dotenv');
const path = require('path');

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
      host: process.env.SSS_DATABASE_HOST || 'ds329058.mlab.com',
      port: process.env.SSS_DATABASE_PORT || 29058,
      username: process.env.SSS_DATABASE_USERNAME || 'thorr',
      password: process.env.SSS_DATABASE_PASSWORD || '1q2w3e4r!2',
      schema: process.env.SSS_DATABASE_SCHEMA,
      dbname: 'street-shop-server',
      path: 'heroku_dmhkbx4g',
      },
    },
};

module.exports = config;
