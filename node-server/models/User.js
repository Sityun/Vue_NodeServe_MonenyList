// 这里创建 用户 合集 mongodb
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    // required 是必填属性
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    // 这里直接默认当前时间
    default: Date.now
  },
})
// 这里进行导出用户创建合集
module.exports = User = mongoose.model("User", UserSchema)