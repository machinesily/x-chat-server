var jwt = require('jsonwebtoken')
var signkey = 'x-chat'

exports.setToken = id => {
  return new Promise(resolve => {
    const token = jwt.sign({ id }, signkey, { expiresIn: '24h' })
    resolve(token)
  })
}

exports.verToken = token => {
  return new Promise(resolve => {
    var info = jwt.verify(token, signkey)
    resolve(info)
  })
}