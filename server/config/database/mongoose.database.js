const config = require('../environment');
const mongoose = require('mongoose')

/*
  몽고 DB 커넥션 
*/

const mongooseDb = mongoose.connect('mongodb://localhost:27017/ellalocaltest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('mongoDb connected'));

module.exports = mongooseDb;
