// login & register 登录和注册
const express = require('express')
const router = express.Router()
const User = require('../../models/User')
// 加密插件
const bcrypt = require('bcrypt')
const mi = 10
// 头像插件
const gravatar = require('gravatar')
// jwt token插件
const jwt = require('jsonwebtoken')

// $router GET api/test
// @desc 返回的请求json数据
// @access 公开的还是 私有的 (这里是一个公开的public)
router.get('/test', (req, res) => {
  res.send({
    msg: '测试',
  })
})

// $router GET api/register
// @desc  注册接口
// @access 注册 公开的还是 私有的 (这里是一个公开的public)
router.post('/register', (req, res) => {
  const { body } = req
  // 查询数据库中是否有邮箱
  User.findOne({
    email: body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: '邮箱已被注册!',
      })
    } else {
      // 获取头像
      const avatar = gravatar.url(body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })
      // 如果没有那么就注册
      const newUser = new User({
        name: body.name,
        email: body.email,
        avatar,
        password: body.password,
        identity: req.body.identity,
      })
      // 这里直接更改密码  只能在最后进行 函数外是获取不到密码的
      bcrypt.hash(newUser.password, mi, (err, hash) => {
        if (err) throw err
        // 如果成功则修改
        newUser.password = hash
        newUser
          .save()
          .then((user) =>
            res.json({
              user,
              msg: '注册成功!',
            })
          )
          .catch((err) => res.send({ err }))
      })
    }
  })
})

// $router POST api/users/login
// @desc   登录接口 返回的是token  jwt passport jsonwebtoken简称jwt
// @access 注册 公开的还是 私有的 (这里是一个公开的public)
router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({
    email,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: '邮箱不存在!' })
    }
    // 这里对密码进行匹配
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        // 生成token 返回token
        // jwt.sign("规则","加密名字",{过期时间},"箭头函数")
        // 定义规则 token储存的数据
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
        }
        // expiresIn 是过期时间 秒做单位 3600就是一个小时
        jwt.sign(rule, 'secret', { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          // 注意这里的格式 必须这么写
          res.json({
            success: true,
            msg: '登陆成功!',
            token: 'Bearer ' + token,
          })
        })
      } else {
        return res.status(400).json({ msg: '密码错误!' })
      }
    })
  })
})

// $router GET api/current
// @desc   return current user 在这里用token验证 然后获取用户信息
// @access Private 私密的
// 引入 验证插件
const passport = require('passport')
// 这里通过 中间件的方式传递出去进行处理
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // 必须 req.user 不然就会报错 好像不会添加到req里面,只能req.user
    const { id, name, email, identity, avatar } = req.user
    res.json({
      id,
      name,
      email,
      identity,
      avatar
    })
  }
)

// 导出
module.exports = router
