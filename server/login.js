var login = require('../dao/dbserver/login')

/** 用户注册 */
exports.login = function (req, res) {
  login.login(req, res)
}
