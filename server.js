var express = require('express');
var app = express();
var router = require('./router/main')(app);

app.set('src', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

console.log("그냥 헤로쿠 콘솔에 찍히는지 확인하려고 하는 테스트 입")