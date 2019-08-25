var express = require('express');
var app = express();
var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(process.env.PORT, function(){
    console.log(process.env.PORT)
});

app.use(express.static('public'));

console.log("그냥 헤로쿠 콘솔에 찍히는지 확인하려고 하는 테스트 입")