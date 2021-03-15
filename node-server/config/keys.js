// 引入mongodb
// 连接数据库
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose
  .connect('mongodb://localhost:27017/node-vue-element', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('数据库连接成功!')
  })
  .catch((err) => console.log('数据库连接失败', err))
