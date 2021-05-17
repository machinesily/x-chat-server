var register = require('../dao/dbserver/register')

/** 用户注册 */
exports.register = function (req, res) {
  register.saveUser(req, res)
}

/** 用户名查重 */
exports.countUser = function (req, res) {
  register.countUser(req, res)
}