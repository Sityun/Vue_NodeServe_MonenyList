// 这里创建 用户 合集 mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  // 描述
  describe: {
    type: String,
  },
  // 收入
  income: {
    type: String,
    required: true,
  },
  // 支出
  expend: {
    type: String,
  },
  // 现金
  cash: {
    type: String,
    required: true,
  },
  // 备注
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
// 这里进行导出用户创建合集
module.exports = Profile = mongoose.model('Profile', ProfileSchema)
