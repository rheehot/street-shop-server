const http = require('http');
const express = require('express');
const api = require('./api');
const config = require('./config/environment');
const database = require('./config/database');

// create server
const app = express();
const server = http.createServer(app);


// 라우트 설정
api.route(app);

// use database
const db = require('./config/database/mongoose.database');
db();
console.log("db 로그인까지 정상적으로 진행되었습니다")
/**
 * 처리하지 못한 예외 로그 기록
 */
process.on('uncaughtException', (err) => {
    console.error('UncaughtException', `[${err.name}] ${err.message}`);
    console.error('UncaughtException', err.stack);
});

/**
 * 서버 종료시 후처리
 *  - 소켓서버 종료
 *  - 실시간 서버 연결 종료
 *  - 데이터베이스 커넥션 종료
 */
process.on('SIGINT', () => {
    io.close(() => {
        server.close(() => {
            console.info('APP', 'close.');
            //TODO 디비연결해제부분
            database.mongooseDb.close();
            process.exit(0);
        });
    });
});

server.listen(config.port, () => {
    console.info('APP', `listening on port ${config.port}, in ${config.env} mode.`);
});

module.exports = server;
