// 这里配置 jwt 验证的
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
// const User = require("../models/User")
const User = mongoose.model("User");
const keys = require("../config/keys")


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = passport => {
  // done是一个回调函数
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // 这里就是获取到处理后的解密后的token表示的参数
    // 格式 请求头 这样子请求参数才可以
    // Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjI3ZDhjNTgzNTJlM2I2OGVjNTFiNiIsIm5hbWUiOiLkuInmnIjkuIkiLCJpYXQiOjE2MDk4MDk3ODMsImV4cCI6MTYwOTgxMzM4M30.nMxOj6l80N5ezdfUZ54aO6r3gpRnTwP9jx37Xfnizu4
    User.findById(jwt_payload.id).then(user => {
      if (user) {
        // 这里返回出去user
        return done(null, user)
      }
      return done(null, false)
    }).catch(err => console.log(err))
  }))
}