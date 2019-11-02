const express = require('express');

const users = require('./users');
const shops = require('./shops');

const route = (app) => {
    const router = express.Router();
    app.use(router);

    router.get('/health', (req, res) => {
        res.send(200);
    });

    app.use('/api/shops', shops);
    app.use('/api/users', users);

    return app;
};

module.exports = route;
