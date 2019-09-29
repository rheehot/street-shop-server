const http = require('http');
const express = require('express');
const api = require('./api');
const log = require('./lib/log');
// const middleware = require('./config/middleware');
const config = require('./config/environment');

// create server
const app = express();
const server = http.createServer(app);
// middleware.setup(app);

/**
 * 처리하지 못한 예외 로그 기록
 */
process.on('uncaughtException', (err) => {
  log.error('UncaughtException', `[${err.name}] ${err.message}`);
  log.error('UncaughtException', err.stack);
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
      log.info('APP', 'close.');
      //TODO 디비연결해재부분
      //   database.mystockDb.close();
      process.exit(0);
    });
  });
});

server.listen(config.port, () => {
  log.info('APP', `listening on port ${config.port}, in ${config.env} mode.`);
});

module.exports = server;