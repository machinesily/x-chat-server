var bcrypt = require('bcryptjs')

/** 生成hash密码 */
exports.encryption = e => {
  //生成随机数
  let salt = bcrypt.genSaltSync(10)

  //生成hash密码
  let hash = bcrypt.hashSync(e, salt)

  return hash
}

//验证
exports.verification = (e,hash)=>{
  let decryption = bcrypt.compareSync(e,hash)

  return decryption
}