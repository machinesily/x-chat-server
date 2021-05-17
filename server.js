const express = require('express')
const app = express()
var verToken = require('./dao/token')
var expressJWT = require('express-jwt');

//解决跨域问问题
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
});

//导入路由表
require('./route/index.js')(app)

// 错误处理
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
})

app.listen(3000, _ => {
  console.log("监听3000端口中")
})

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  console.log(token)
  if (token === undefined) {
    return next();
  } else {
    verToken.verToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
  next(createError(404));
});

app.use(expressJWT({
  secret: 'x-chat',
  algorithms: ["HS256"]
}).unless({
  path: ['/register', '/login', 'countUser']//除了这个地址，其他的URL都需要验证
}));