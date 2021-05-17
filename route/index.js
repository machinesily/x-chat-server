//注册页面服务
var register = require('../server/register')
//登录页面服务
var login = require('../server/login')


module.exports = function (app) {
  /** 用户注册 */
  app.get('/register', (req, res) => {
    register.register(req, res)
  });

  /** 用户名查重 */
  app.get('/countUser', (req, res) => {
    register.countUser(req, res)
  })

  /** 用户登录 */
  app.get('/login', (req, res) => {
    login.login(req, res)
  })

}