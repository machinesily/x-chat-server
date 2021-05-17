var dbmodel = require('../../model/dbmodel')
var User = dbmodel.model('User')
//引入加密文件
var bcrypt = require('../bcrypt')

//新建用户
exports.saveUser = (req, res) => {
  let data = {
    ...req.query,
    passWord: bcrypt.encryption(req.query.passWord),
    time: new Date()
  }
  let user = new User(data)

  user.save(function (err, result) {
    err ? res.status(500).send(err.message) : res.status(200).send(result)
  })
}

//查看用户名是否注册
exports.countUser = (req, res) => {
  //MongoDB查找的方法
  User.countDocuments(req.query, (err, result) => {
    err ? res.status(500).send(err.message) : res.status(200).send(Boolean(result))
  })
}

