const express = require('express');
//example
const users = require('./users');
const shops = require('./shops');

const route = (app) => {
    const router = express.Router();
    app.use(router);

    router.get('/health', (req, res) => {
        res.send(200);
    });

    //example
    app.use('/api/test', test);

    //example 과 동일한 구조로 작성
    app.use('/api/shops', shops);

    return app;
};

module.exports = route;
