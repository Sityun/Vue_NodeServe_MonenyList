//下载express  npm i express -S
const express = require('express')
const app = express()
const port = process.env.PORT || 8848
// 这里是全局配置
// 引入bodyParser
// 几个获取参数的方式
// req.body 这里获取的是直接传入的
// req.query  这里是 api/user?id=123 这种传参方式
const bodyParser = require('body-parser')
// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }))
//处理json参数
app.use(bodyParser.json())

// 引入mongodb 连接数据库操作
require('./config/keys')
// 引入 路由users.js
const users = require('./routes/api/user')
// 使用
app.use('/api/users', users)

// 引入路由Profile
const Profile = require('./routes/api/Profile')
app.use('/api/profiles', Profile)

// 验证token得插件 passport-jwt passport
const passport = require('passport')
// 全局应用 passport初始化
app.use(passport.initialize())
// 这里是配置文件
require('./config/passport')(passport)

app.get('/', (req, res) => {
  res.send({
    寄语: '瞅啥呢?',
  })
})
app.listen(port, () =>
  console.log(`Server running at  http://127.0.0.1:${port}`)
)
