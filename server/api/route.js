const express = require('express');
//example
const test = require('./test');

const route = (app) => {
    const router = express.Router();
    app.use(router);

    router.get('/health', (req, res) => {
        res.send(200);
    });

    //example
    app.use('/api/test', test);

    return app;
};

module.exports = route;
