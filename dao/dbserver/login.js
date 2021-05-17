var dbmodel = require('../../model/dbmodel')
var User = dbmodel.model('User')
//引入加密文件
var bcrypt = require('../bcrypt')
//token生成
var createToken = require('../token')
//用户登录
exports.login = (req, res) => {
  let wherestr = {
    'userName': req.query.userName
  }
  User.find(wherestr, async (err, result) => {
    if (err) return res.status(500).send(err.message)
    if (!result.length) return res.status(200).send({
      match: false,
      errorMessage: '该用户不存在'
    })
    const user = result[0]
    if (!bcrypt.verification(req.query.passWord, user.passWord)) return res.status(200).send({
      match: false,
      errorMessage: '密码错误'
    })
    const token = await createToken.setToken(user._id)
    let data = {
      match: true,
      userID: user._id,
      userName: user.userName,
      imgurl: user.imgurl,
      token
    }
    res.status(200).send(data)
  })
}