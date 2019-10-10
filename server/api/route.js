const express = require('express');
//example
const users = require('./users');

const route = (app) => {
    const router = express.Router();
    app.use(router);

    router.get('/health', (req, res) => {
        res.send(200);
    });

    //example
    app.use('/api/test', users);

    return app;
};

module.exports = route;
