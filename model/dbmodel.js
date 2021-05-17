var mongoose = require('mongoose')

var db = require('../config/db')

var Schema = mongoose.Schema

//用户表
var UserSchema = new Schema({              
  userName: { type:String },                      //用户名
  passWord: { type:String },                       //密码
  userMail: { type:String },                      //邮箱
  sex: { type:String, default:'asexual' },     //性别，默认中性
  birth: { type:String },                       //生日
  phone: { type:String },                     //电话
  explain: { type:String },                   //介绍
  imgurl: { type:String, default:'/user/add.png' },  //头像
  time: { type:Date },                        //注册时间
})

//好友表
var FriendSchema = new Schema({
  userID:{type:Schema.Types.ObjectId,ref:'User'},      //用户id
  friendID:{type:Schema.Types.ObjectId,ref:'User'},    //好友id
  alias:{type:String},                                 //好友备注
  state:{type:String},                                 //好友状态（0：好友，1：申请中，2：申请发送方）
  time:{type:Date},                                    //生成时间
  lastTime:{type:Date}                                 //最后通讯时间
})

//一对一消息表
var MessageSchema = new Schema({
  userID:{type:Schema.Types.ObjectId,ref:'User'},      //用户id
  friendID:{type:Schema.Types.ObjectId,ref:'User'},    //好友id
  message:{type:String},                               //发送的内容
  type:{type:String},                                 //发送类型（0文字，1图片，2音频。。。）
  time:{type:Date},                                    //生成时间
  state:{type:Number}                                  //消息状态（0已读，1未读）
})

//群表
var GroupSchema = new Schema({
  userID:{type:Schema.Types.ObjectId,ref:'User'},      //用户id
  name:{type:String},                                  //群名称
  imgurl:{type:String,default:'group.png'},            //群头像
  time:{type:Date},                                    //创建时间
  lastTime:{type:Date},                               //最后通讯时间
  notice:{type:String,default:''}                      //公告
})

//群成员表
var GroupUserSchema = new Schema({
  groupID:{type:Schema.Types.ObjectId,ref:'Group'},    //群id
  userID:{type:Schema.Types.ObjectId,ref:'User'},      //用户id
  aliasName:{type:String,default:''},                                  //群内名称
  tip:{type:Number,default:0},                         //未读消息数
  time:{type:Date},                                    //加入时间
  lastTime:{type:Date},                                //最后通讯时间
  shield:{type:Boolean,default:false}                                 //是否屏蔽群消息（0不屏蔽，1屏蔽）
})

//群消息表
var GroupMessageSchema = new Schema({
  groupID:{type:Schema.Types.ObjectId,ref:'Group'},    //群id
  userID:{type:Schema.Types.ObjectId,ref:'User'},      //用户id
  message:{type:String},                               //发送的内容
  type:{type:Number},                                 //发送类型（0文字，1图片，3音频。。。）
  time:{type:Date},                                    //生成时间
})
module.exports = db.model("User",UserSchema)
module.exports = db.model("Friend",FriendSchema)
module.exports = db.model("Message",MessageSchema)
module.exports = db.model("Group",GroupSchema)
module.exports = db.model("GroupUser",GroupUserSchema)
module.exports = db.model("GroupMessage",GroupMessageSchema)
