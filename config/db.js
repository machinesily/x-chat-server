var mongoose = require('mongoose')
// mongoose.set('useFindAndModify', false)
var db = mongoose.createConnection('mongodb://localhost:27017/x-chat',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('数据库连接成功');
});

module.exports = db